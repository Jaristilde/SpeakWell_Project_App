import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';
import type { CreateExerciseInput, Lesson, Topic } from '../../services/cmsApi';

const exerciseTypes = [
  { value: 'speaking', label: 'Speaking' },
  { value: 'listening', label: 'Listening' },
  { value: 'reading', label: 'Reading' },
  { value: 'pronunciation', label: 'Pronunciation' },
  { value: 'vocabulary', label: 'Vocabulary' },
  { value: 'conversation', label: 'Conversation' },
] as const;

export default function AdminExerciseForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  const [formData, setFormData] = useState<CreateExerciseInput>({
    type: 'speaking',
    prompt: '',
    instructions: '',
    expectedDurationSeconds: 60,
    lessonId: '',
    topicId: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load lessons and topics for dropdowns
      const [lessonsData, topicsData] = await Promise.all([
        cmsApi.getLessons(),
        cmsApi.getTopics(),
      ]);
      setLessons(lessonsData);
      setTopics(topicsData);

      // Load exercise if editing
      if (isEditing) {
        const exercise = await cmsApi.getExercise(id!);
        setFormData({
          type: exercise.type,
          prompt: exercise.prompt,
          instructions: exercise.instructions || '',
          expectedDurationSeconds: exercise.expectedDurationSeconds,
          lessonId: exercise.lessonId || '',
          topicId: exercise.topicId || '',
          order: exercise.order,
          isActive: exercise.isActive,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.prompt.trim()) {
      setError('Prompt is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const submitData = {
        ...formData,
        lessonId: formData.lessonId || undefined,
        topicId: formData.topicId || undefined,
      };

      if (isEditing) {
        await cmsApi.updateExercise(id!, submitData);
      } else {
        await cmsApi.createExercise(submitData);
      }

      navigate('/admin/exercises');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save exercise');
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
          to="/admin/exercises"
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Exercise' : 'New Exercise'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEditing ? 'Update exercise details' : 'Create a new practice exercise'}
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Exercise Details</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
              >
                {exerciseTypes.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
                Prompt *
              </label>
              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent resize-none"
                placeholder="Enter the exercise prompt that users will see"
                required
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                Instructions (optional)
              </label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions || ''}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent resize-none"
                placeholder="Additional instructions for completing the exercise"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="expectedDurationSeconds" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  id="expectedDurationSeconds"
                  name="expectedDurationSeconds"
                  value={formData.expectedDurationSeconds}
                  onChange={handleChange}
                  min={10}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {Math.floor(formData.expectedDurationSeconds / 60)}:{String(formData.expectedDurationSeconds % 60).padStart(2, '0')} minutes
                </p>
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Order
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

              <div className="flex items-center pt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-[#0B4CDC] focus:ring-[#0B4CDC]"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Link to Content (Optional)</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lessonId" className="block text-sm font-medium text-gray-700 mb-1">
                Lesson
              </label>
              <select
                id="lessonId"
                name="lessonId"
                value={formData.lessonId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
              >
                <option value="">No lesson</option>
                {lessons.map(lesson => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="topicId" className="block text-sm font-medium text-gray-700 mb-1">
                Topic
              </label>
              <select
                id="topicId"
                name="topicId"
                value={formData.topicId || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B4CDC] focus:border-transparent"
              >
                <option value="">No topic</option>
                {topics.map(topic => (
                  <option key={topic.id} value={topic.id}>
                    {topic.icon} {topic.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <Link
            to="/admin/exercises"
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
                {isEditing ? 'Update Exercise' : 'Create Exercise'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
