import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';
import type { Lesson } from '../../services/cmsApi';

export default function AdminLessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cmsApi.getLessons();
      setLessons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await cmsApi.deleteLesson(id);
      setLessons(lessons.filter(l => l.id !== id));
      setDeleteId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete lesson');
    }
  };

  const handleTogglePublish = async (lesson: Lesson) => {
    try {
      const updated = await cmsApi.updateLesson(lesson.id, {
        isPublished: !lesson.isPublished,
      });
      setLessons(lessons.map(l => l.id === lesson.id ? updated : l));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update lesson');
    }
  };

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(search.toLowerCase()) ||
    lesson.category.toLowerCase().includes(search.toLowerCase())
  );

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700',
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Lessons</h1>
          <p className="text-gray-500 mt-1">
            {lessons.length} total, {lessons.filter(l => l.isPublished).length} published
          </p>
        </div>
        <Link
          to="/admin/lessons/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B4CDC] text-white rounded-lg hover:bg-[#0839A8] transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Lesson
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchLessons}
            className="mt-2 text-sm text-red-700 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
        />
      </div>

      {/* Lessons Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Title</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Category</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Difficulty</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Duration</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredLessons.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {search ? 'No lessons match your search' : 'No lessons yet. Create your first lesson!'}
                </td>
              </tr>
            ) : (
              filteredLessons.map((lesson) => (
                <tr key={lesson.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      to={`/admin/lessons/${lesson.id}`}
                      className="font-medium text-gray-900 hover:text-[#0B4CDC]"
                    >
                      {lesson.title}
                    </Link>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{lesson.description}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lesson.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[lesson.difficulty]}`}>
                      {lesson.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{lesson.durationMinutes} min</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublish(lesson)}
                      className={`inline-flex items-center gap-1 text-sm ${
                        lesson.isPublished ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {lesson.isPublished ? (
                        <>
                          <Eye className="w-4 h-4" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/admin/lessons/${lesson.id}`}
                        className="p-2 text-gray-400 hover:text-[#0B4CDC] transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(lesson.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Lesson?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The lesson will be permanently deleted.
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
