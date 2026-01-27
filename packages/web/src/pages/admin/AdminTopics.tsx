import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Check, X, Loader2 } from 'lucide-react';
import { cmsApi } from '../../services/cmsApi';
import type { Topic, CreateTopicInput } from '../../services/cmsApi';

export default function AdminTopics() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateTopicInput>({
    name: '',
    description: '',
    icon: '',
    order: 0,
    isActive: true,
  });

  const fetchTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cmsApi.getTopics();
      setTopics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      icon: '',
      order: topics.length,
      isActive: true,
    });
  };

  const handleCreate = () => {
    resetForm();
    setFormData(prev => ({ ...prev, order: topics.length }));
    setIsCreating(true);
    setEditingId(null);
  };

  const handleEdit = (topic: Topic) => {
    setFormData({
      name: topic.name,
      description: topic.description,
      icon: topic.icon || '',
      order: topic.order,
      isActive: topic.isActive,
    });
    setEditingId(topic.id);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    resetForm();
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (isCreating) {
        const newTopic = await cmsApi.createTopic(formData);
        setTopics([...topics, newTopic]);
      } else if (editingId) {
        const updated = await cmsApi.updateTopic(editingId, formData);
        setTopics(topics.map(t => t.id === editingId ? updated : t));
      }

      handleCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save topic');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await cmsApi.deleteTopic(id);
      setTopics(topics.filter(t => t.id !== id));
      setDeleteId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete topic');
    }
  };

  const handleToggleActive = async (topic: Topic) => {
    try {
      const updated = await cmsApi.updateTopic(topic.id, {
        isActive: !topic.isActive,
      });
      setTopics(topics.map(t => t.id === topic.id ? updated : t));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update topic');
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Topics</h1>
          <p className="text-gray-500 mt-1">
            {topics.length} total, {topics.filter(t => t.isActive).length} active
          </p>
        </div>
        <button
          onClick={handleCreate}
          disabled={isCreating || editingId !== null}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#0B4CDC] text-white rounded-lg hover:bg-[#0839A8] transition-colors disabled:opacity-50"
        >
          <Plus className="w-5 h-5" />
          New Topic
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Name</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Description</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Icon</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Order</th>
              <th className="text-left px-6 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-right px-6 py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Create Row */}
            {isCreating && (
              <tr className="bg-blue-50">
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                    placeholder="Topic name"
                    autoFocus
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                    placeholder="Description"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="text"
                    value={formData.icon || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    className="w-24 px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                    placeholder="emoji"
                  />
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                    className="w-20 px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                    min={0}
                  />
                </td>
                <td className="px-6 py-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-[#0B4CDC] focus:ring-[#0B4CDC]"
                    />
                    <span className="text-sm">Active</span>
                  </label>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="p-2 text-green-600 hover:text-green-700 transition-colors"
                    >
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {/* Topic Rows */}
            {topics.length === 0 && !isCreating ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  No topics yet. Create your first topic!
                </td>
              </tr>
            ) : (
              topics.map((topic) => (
                <tr key={topic.id} className={editingId === topic.id ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                  {editingId === topic.id ? (
                    <>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                          autoFocus
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={formData.description}
                          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                          className="w-full px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          value={formData.icon || ''}
                          onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                          className="w-24 px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="number"
                          value={formData.order}
                          onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                          className="w-20 px-3 py-1.5 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#0B4CDC]"
                          min={0}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                            className="w-4 h-4 rounded border-gray-300 text-[#0B4CDC] focus:ring-[#0B4CDC]"
                          />
                          <span className="text-sm">Active</span>
                        </label>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={handleSave}
                            disabled={saving}
                            className="p-2 text-green-600 hover:text-green-700 transition-colors"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-6 py-4 font-medium text-gray-900">{topic.name}</td>
                      <td className="px-6 py-4 text-gray-600 truncate max-w-xs">{topic.description}</td>
                      <td className="px-6 py-4 text-2xl">{topic.icon || '-'}</td>
                      <td className="px-6 py-4 text-gray-600">{topic.order}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleActive(topic)}
                          className={`text-sm font-medium ${
                            topic.isActive ? 'text-green-600' : 'text-gray-400'
                          }`}
                        >
                          {topic.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(topic)}
                            disabled={isCreating || editingId !== null}
                            className="p-2 text-gray-400 hover:text-[#0B4CDC] transition-colors disabled:opacity-50"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(topic.id)}
                            disabled={isCreating || editingId !== null}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Topic?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The topic will be permanently deleted.
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
