import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Image, 
  Trash2, 
  Search, 
  UploadCloud, 
  LayoutGrid, 
  List, 
  HardDrive, 
  File,
  Filter
} from 'lucide-react';
import { FileMetadata } from '../types';

const KnowledgeHub: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');
  const [selectedType, setSelectedType] = useState('All Types');

  const [files, setFiles] = useState<FileMetadata[]>([
    { id: '1', name: 'Physics Notes - Chapter 1.pdf', type: 'PDF', size: '2.4 MB', dateUploaded: '2023-10-12', tags: ['Physics', 'Notes'] },
    { id: '2', name: 'Math Formula Sheet.docx', type: 'DOCX', size: '1.1 MB', dateUploaded: '2023-10-14', tags: ['Math'] },
    { id: '3', name: 'Biology Diagram.png', type: 'IMG', size: '0.5 MB', dateUploaded: '2023-10-15', tags: ['Biology'] },
    { id: '4', name: 'History Timeline.pdf', type: 'PDF', size: '3.2 MB', dateUploaded: '2023-10-18', tags: ['History'] },
    { id: '5', name: 'Literature Essay Draft.txt', type: 'DOCX', size: '0.1 MB', dateUploaded: '2023-10-19', tags: ['Literature'] }, // Using DOCX icon for text/doc for simplicity or generic
    { id: '6', name: 'Chemistry Periodic Table.img', type: 'IMG', size: '1.8 MB', dateUploaded: '2023-10-20', tags: ['Chemistry'] },
  ]);

  const handleDelete = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const getIcon = (type: string) => {
    if (type === 'IMG') return <Image className="text-purple-500" size={24} />;
    if (type === 'PDF') return <FileText className="text-red-500" size={24} />;
    return <FileText className="text-blue-500" size={24} />;
  };

  // Compute stats
  const totalFiles = files.length;
  const totalSizeMB = useMemo(() => {
    return files.reduce((acc, file) => {
      const sizeVal = parseFloat(file.size.split(' ')[0]);
      // Assuming MB for simplicity, or we could parse KB
      return acc + sizeVal;
    }, 0);
  }, [files]);
  
  const MAX_STORAGE = 150; // MB

  // Filter logic
  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = selectedSubject === 'All Subjects' || file.tags.some(t => t === selectedSubject);
      
      let matchesType = selectedType === 'All Types';
      if (!matchesType) {
        if (selectedType === 'PDF' && file.type === 'PDF') matchesType = true;
        if (selectedType === 'DOCX' && file.type === 'DOCX') matchesType = true;
        if (selectedType === 'Images' && file.type === 'IMG') matchesType = true;
        if (selectedType === 'TXT' && file.name.endsWith('.txt')) matchesType = true; // Simple check for TXT
      }

      return matchesSearch && matchesSubject && matchesType;
    });
  }, [files, searchQuery, selectedSubject, selectedType]);

  const uniqueSubjects = ['All Subjects', ...Array.from(new Set(files.flatMap(f => f.tags))).sort()];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Files</h1>
          <p className="text-slate-500 mt-1">Manage and organize your study materials.</p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition shadow-sm shadow-indigo-200 font-medium">
          <UploadCloud size={18} /> Upload File
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <File size={32} />
           </div>
           <div>
              <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Total Files</p>
              <h3 className="text-3xl font-bold text-slate-900">{totalFiles}</h3>
              <p className="text-xs text-slate-400 mt-1">Across all subjects</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
           <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <HardDrive size={32} />
           </div>
           <div className="flex-1">
              <div className="flex justify-between items-end mb-1">
                 <div>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wide">Storage Used</p>
                    <h3 className="text-3xl font-bold text-slate-900">{totalSizeMB.toFixed(1)} <span className="text-lg text-slate-400 font-medium">MB</span></h3>
                 </div>
                 <span className="text-xs font-medium text-slate-500">{Math.round((totalSizeMB / MAX_STORAGE) * 100)}% Used</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                 <div 
                   className="bg-purple-600 h-full rounded-full transition-all duration-500" 
                   style={{ width: `${Math.min((totalSizeMB / MAX_STORAGE) * 100, 100)}%` }}
                 ></div>
              </div>
              <p className="text-xs text-slate-400 mt-2">Limit: {MAX_STORAGE} MB</p>
           </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-3 w-full md:w-auto overflow-x-auto no-scrollbar">
           <div className="relative min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none cursor-pointer text-slate-700 font-medium"
              >
                {uniqueSubjects.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
           </div>

           <div className="relative min-w-[140px]">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm appearance-none cursor-pointer text-slate-700 font-medium"
              >
                <option>All Types</option>
                <option>PDF</option>
                <option>DOCX</option>
                <option>Images</option>
                <option>TXT</option>
              </select>
           </div>
        </div>

        {/* View Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 shrink-0">
           <button 
             onClick={() => setViewMode('grid')}
             className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <LayoutGrid size={18} />
           </button>
           <button 
             onClick={() => setViewMode('list')}
             className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
           >
             <List size={18} />
           </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'list' ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-sm border-b border-slate-100 bg-slate-50/50">
                <th className="p-4 font-medium pl-6">Name</th>
                <th className="p-4 font-medium hidden md:table-cell">Type</th>
                <th className="p-4 font-medium hidden md:table-cell">Size</th>
                <th className="p-4 font-medium hidden md:table-cell">Uploaded</th>
                <th className="p-4 font-medium">Tags</th>
                <th className="p-4 font-medium text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map(file => (
                <tr key={file.id} className="hover:bg-slate-50 group border-b border-slate-50 last:border-0 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl">
                        {getIcon(file.type)}
                      </div>
                      <span className="font-semibold text-slate-700">{file.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-slate-600 hidden md:table-cell text-sm font-medium">{file.type}</td>
                  <td className="p-4 text-slate-600 hidden md:table-cell text-sm">{file.size}</td>
                  <td className="p-4 text-slate-600 hidden md:table-cell text-sm">{file.dateUploaded}</td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {file.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button 
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredFiles.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400">
                    No files found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
           {filteredFiles.map(file => (
              <div key={file.id} className="group bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all relative">
                 <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                       {getIcon(file.type)}
                    </div>
                    <button 
                       onClick={() => handleDelete(file.id)}
                       className="text-slate-300 hover:text-red-500 transition-colors p-1"
                    >
                       <Trash2 size={16} />
                    </button>
                 </div>
                 
                 <h3 className="font-bold text-slate-800 mb-1 truncate" title={file.name}>{file.name}</h3>
                 <p className="text-xs text-slate-400 mb-4">{file.size} • {file.dateUploaded}</p>
                 
                 <div className="flex gap-1 flex-wrap">
                    {file.tags.map(tag => (
                       <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase">
                          {tag}
                       </span>
                    ))}
                 </div>
              </div>
           ))}
           {filteredFiles.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-400">
                 No files found matching your filters.
              </div>
           )}
        </div>
      )}
    </div>
  );
};

export default KnowledgeHub;