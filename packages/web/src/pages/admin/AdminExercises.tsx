import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';
import type { Exercise } from '../../services/cmsApi';

const exerciseTypeLabels: Record<string, { label: string; color: string }> = {
  speaking: { label: 'Speaking', color: 'bg-blue-100 text-blue-700' },
  listening: { label: 'Listening', color: 'bg-purple-100 text-purple-700' },
  reading: { label: 'Reading', color: 'bg-green-100 text-green-700' },
  pronunciation: { label: 'Pronunciation', color: 'bg-orange-100 text-orange-700' },
  vocabulary: { label: 'Vocabulary', color: 'bg-pink-100 text-pink-700' },
  conversation: { label: 'Conversation', color: 'bg-teal-100 text-teal-700' },
};

export default function AdminExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cmsApi.getExercises();
      setExercises(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await cmsApi.deleteExercise(id);
      setExercises(exercises.filter(e => e.id !== id));
      setDeleteId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete exercise');
    }
  };

  const handleToggleActive = async (exercise: Exercise) => {
    try {
      const updated = await cmsApi.updateExercise(exercise.id, {
        isActive: !exercise.isActive,
      });
      setExercises(exercises.map(e => e.id === exercise.id ? updated : e));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update exercise');
    }
  };

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.prompt.toLowerCase().includes(search.toLowerCase());
    const matchesType = !filterType || exercise.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#0B4CDC] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercises</h1>
          <p className="text-gray-500 mt-1">
            {exercises.length} total, {exercises.filter(e => e.isActive).length} active
          </p>
        </div>
        <Link
          to="/admin/exercises/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B4CDC] text-white rounded-lg hover:bg-[#0839A8] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Exercise
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button onClick={fetchExercises} className="mt-2 text-sm text-red-700 underline">
            Try again
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
        >
          <option value="">All Types</option>
          {Object.entries(exerciseTypeLabels).map(([value, { label }]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Exercises Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Prompt</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Type</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Duration</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredExercises.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  {search || filterType ? 'No exercises match your filters' : 'No exercises yet. Create your first exercise!'}
                </td>
              </tr>
            ) : (
              filteredExercises.map((exercise) => {
                const typeInfo = exerciseTypeLabels[exercise.type] || { label: exercise.type, color: 'bg-gray-100 text-gray-700' };
                return (
                  <tr key={exercise.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/exercises/${exercise.id}`}
                        className="font-medium text-gray-900 hover:text-[#0B4CDC]"
                      >
                        {exercise.prompt.length > 80
                          ? exercise.prompt.substring(0, 80) + '...'
                          : exercise.prompt}
                      </Link>
                      {exercise.instructions && (
                        <p className="text-sm text-gray-500 truncate max-w-md">
                          {exercise.instructions}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {Math.floor(exercise.expectedDurationSeconds / 60)}:{String(exercise.expectedDurationSeconds % 60).padStart(2, '0')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(exercise)}
                        className={`text-sm font-medium ${
                          exercise.isActive ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {exercise.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/exercises/${exercise.id}`}
                          className="p-2 text-gray-400 hover:text-[#0B4CDC] transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(exercise.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Exercise?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The exercise will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
