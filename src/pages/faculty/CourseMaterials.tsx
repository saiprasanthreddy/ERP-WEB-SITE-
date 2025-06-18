
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Upload, FileText, Video, Download, Eye, Trash2, Plus, Search } from 'lucide-react';

interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'ppt' | 'doc';
  subject: string;
  topic: string;
  uploadDate: string;
  size: string;
  downloads: number;
  status: 'active' | 'draft';
  url?: string;
}

const CourseMaterials: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('CS601');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    type: 'pdf' as Material['type'],
    topic: '',
    description: ''
  });

  const materials: Material[] = [
    {
      id: '1',
      title: 'Database Design Fundamentals',
      type: 'pdf',
      subject: 'CS601',
      topic: 'Database Design',
      uploadDate: '2024-06-15',
      size: '2.3 MB',
      downloads: 145,
      status: 'active'
    },
    {
      id: '2',
      title: 'SQL Query Optimization Techniques',
      type: 'video',
      subject: 'CS601',
      topic: 'Query Optimization',
      uploadDate: '2024-06-10',
      size: '156 MB',
      downloads: 89,
      status: 'active'
    },
    {
      id: '3',
      title: 'Transaction Management Slides',
      type: 'ppt',
      subject: 'CS601',
      topic: 'Transactions',
      uploadDate: '2024-06-08',
      size: '5.1 MB',
      downloads: 112,
      status: 'active'
    },
    {
      id: '4',
      title: 'NoSQL Database Concepts',
      type: 'doc',
      subject: 'CS601',
      topic: 'NoSQL',
      uploadDate: '2024-06-05',
      size: '1.8 MB',
      downloads: 67,
      status: 'draft'
    }
  ];

  const subjects = [
    { code: 'CS601', name: 'Advanced Database Systems' },
    { code: 'CS602L', name: 'Database Systems Lab' }
  ];

  const filteredMaterials = materials.filter(material =>
    material.subject === selectedSubject &&
    (material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     material.topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeIcon = (type: Material['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
      case 'video': return <Video className="h-5 w-5 text-blue-600" />;
      case 'ppt': return <FileText className="h-5 w-5 text-orange-600" />;
      case 'doc': return <FileText className="h-5 w-5 text-blue-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: Material['type']) => {
    switch (type) {
      case 'pdf': return 'bg-red-50 border-red-200 text-red-700';
      case 'video': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'ppt': return 'bg-orange-50 border-orange-200 text-orange-700';
      case 'doc': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const handleUpload = () => {
    console.log('Uploading material:', uploadForm);
    setShowUploadForm(false);
    setUploadForm({ title: '', type: 'pdf', topic: '', description: '' });
  };

  const totalMaterials = materials.filter(m => m.subject === selectedSubject).length;
  const totalDownloads = materials.filter(m => m.subject === selectedSubject).reduce((sum, m) => sum + m.downloads, 0);
  const activeMaterials = materials.filter(m => m.subject === selectedSubject && m.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Materials</h1>
          <p className="text-gray-600">Upload and manage learning materials for your courses</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            {subjects.map(subject => (
              <option key={subject.code} value={subject.code}>
                {subject.code} - {subject.name}
              </option>
            ))}
          </select>
          <Button onClick={() => setShowUploadForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">Total Materials</p>
                <p className="text-xl font-bold">{totalMaterials}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-500">Total Downloads</p>
                <p className="text-xl font-bold">{totalDownloads}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-500">Active Materials</p>
                <p className="text-xl font-bold">{activeMaterials}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-xl font-bold">4</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle>Upload New Material</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Material Title</Label>
                <Input
                  id="title"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter material title"
                />
              </div>
              <div>
                <Label htmlFor="type">Material Type</Label>
                <select
                  id="type"
                  value={uploadForm.type}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, type: e.target.value as Material['type'] }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="pdf">PDF Document</option>
                  <option value="video">Video</option>
                  <option value="ppt">PowerPoint</option>
                  <option value="doc">Word Document</option>
                </select>
              </div>
              <div>
                <Label htmlFor="topic">Topic/Chapter</Label>
                <Input
                  id="topic"
                  value={uploadForm.topic}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, topic: e.target.value }))}
                  placeholder="Enter topic or chapter"
                />
              </div>
              <div>
                <Label htmlFor="file">Select File</Label>
                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.avi"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the material"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <Button onClick={handleUpload}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
              <Button variant="outline" onClick={() => setShowUploadForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Materials Library</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredMaterials.map((material) => (
              <Card key={material.id} className={`border-2 ${getTypeColor(material.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(material.type)}
                      <div>
                        <h3 className="font-semibold">{material.title}</h3>
                        <p className="text-sm text-gray-600">{material.topic}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Badge variant={material.status === 'active' ? 'default' : 'secondary'}>
                        {material.status}
                      </Badge>
                      <Badge variant="outline" className="uppercase">
                        {material.type}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-gray-500">Upload Date</p>
                      <p className="font-medium">{new Date(material.uploadDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">File Size</p>
                      <p className="font-medium">{material.size}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Downloads</p>
                      <p className="font-medium">{material.downloads}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Status</p>
                      <p className="font-medium capitalize">{material.status}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseMaterials;
