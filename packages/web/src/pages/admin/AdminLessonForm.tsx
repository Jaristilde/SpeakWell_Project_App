import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';
import type { CreateLessonInput } from '../../services/cmsApi';

const categories = [
  'Public Speaking',
  'Interviews',
  'Presentations',
  'Conversations',
  'Pronunciation',
  'Vocabulary',
  'Grammar',
  'Other',
];

const difficulties = ['beginner', 'intermediate', 'advanced'] as const;

export default function AdminLessonForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateLessonInput>({
    title: '',
    description: '',
    content: { sections: [] },
    durationMinutes: 15,
    difficulty: 'beginner',
    category: 'Public Speaking',
    order: 0,
    isPublished: false,
  });

  useEffect(() => {
    if (isEditing) {
      loadLesson();
    }
  }, [isEditing, id]);

  const loadLesson = async () => {
    try {
      setLoading(true);
      const lesson = await cmsApi.getLesson(id!);
      setFormData({
        title: lesson.title,
        description: lesson.description,
        content: lesson.content || { sections: [] },
        durationMinutes: lesson.durationMinutes,
        difficulty: lesson.difficulty,
        category: lesson.category,
        order: lesson.order,
        isPublished: lesson.isPublished,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (isEditing) {
        await cmsApi.updateLesson(id!, formData);
      } else {
        await cmsApi.createLesson(formData);
      }

      navigate('/admin/lessons');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save lesson');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
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
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/lessons"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Lesson' : 'New Lesson'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditing ? 'Update lesson details' : 'Create a new lesson'}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
                placeholder="Enter lesson title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent resize-none"
                placeholder="Brief description of the lesson"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="durationMinutes" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="durationMinutes"
                  name="durationMinutes"
                  value={formData.durationMinutes}
                  onChange={handleChange}
                  min={1}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Order (for sequencing)
                </label>
                <input
                  type="number"
                  id="order"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  min={0}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
                />
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#0B4CDC] focus:ring-[#0B4CDC]"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Published (visible to users)
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content (JSON)</h2>
          <p className="text-sm text-gray-500 mb-4">
            Add lesson content as JSON. You can include text sections, video URLs, and exercise references.
          </p>
          <textarea
            id="content"
            value={JSON.stringify(formData.content, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setFormData(prev => ({ ...prev, content: parsed }));
              } catch {
                // Invalid JSON, keep the text as-is for editing
              }
            }}
            rows={10}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent font-mono text-sm resize-none"
            placeholder='{"sections": [{"type": "text", "content": "..."}]}'
          />
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link
            to="/admin/lessons"
            className="px-6 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0B4CDC] text-white rounded-lg hover:bg-[#0839A8] transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {isEditing ? 'Update Lesson' : 'Create Lesson'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
