import React, { useState, useEffect } from 'react';
import { 
    Home, Briefcase, TrendingUp, Award, Mail, User, Target, Github, Linkedin, Plus, X, 
    Moon, Sun, Download, Search, Filter, Camera, FileText, Star, Quote, Settings,
    Calendar, MapPin, Phone, Globe, Edit, Save, Upload, Eye, EyeOff
} from 'lucide-react';
import './App.css';

function App() {
    // State management
    const [darkMode, setDarkMode] = useState(false);
    const [currentTheme, setCurrentTheme] = useState('gradient');
    const [showAddWorkModal, setShowAddWorkModal] = useState(false);
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddBlogModal, setShowAddBlogModal] = useState(false);
    const [showAddTestimonialModal, setShowAddTestimonialModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    
    // Data states
    const [workItems, setWorkItems] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [skills, setSkills] = useState([]);
    const [careerMilestones, setCareerMilestones] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [profile, setProfile] = useState({
        name: 'Your Name',
        title: 'Professional Title',
        bio: 'Your professional bio goes here. Share your passion, expertise, and what drives you in your career.',
        location: 'Your Location',
        email: 'your.email@example.com',
        phone: '+1 (555) 123-4567',
        website: 'https://yourwebsite.com',
        linkedin: 'https://linkedin.com/in/yourprofile',
        github: 'https://github.com/yourusername',
        photo: null
    });

    // Theme configurations
    const themes = {
        gradient: {
            name: 'Gradient Blue',
            hero: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #4f46e5)',
            accent: '#3b82f6',
            secondary: '#8b5cf6'
        },
        modern: {
            name: 'Modern Dark',
            hero: 'linear-gradient(135deg, #1f2937, #374151, #000000)',
            accent: '#10b981',
            secondary: '#14b8a6'
        },
        warm: {
            name: 'Warm Sunset',
            hero: 'linear-gradient(135deg, #f97316, #ef4444, #ec4899)',
            accent: '#f97316',
            secondary: '#ef4444'
        },
        professional: {
            name: 'Professional Navy',
            hero: 'linear-gradient(135deg, #1e293b, #1e40af, #3730a3)',
            accent: '#3b82f6',
            secondary: '#6366f1'
        }
    };

    // Load data from localStorage
    useEffect(() => {
        const loadData = (key, setter) => {
            const stored = localStorage.getItem(key);
            if (stored) {
                try {
                    setter(JSON.parse(stored));
                } catch (e) {
                    console.error(`Error loading ${key}:`, e);
                }
            }
        };

        loadData('workItems', setWorkItems);
        loadData('tasks', setTasks);
        loadData('skills', setSkills);
        loadData('careerMilestones', setCareerMilestones);
        loadData('blogPosts', setBlogPosts);
        loadData('testimonials', setTestimonials);
        loadData('profile', setProfile);
        loadData('darkMode', setDarkMode);
        loadData('currentTheme', setCurrentTheme);
    }, []);

    // Save data to localStorage
    useEffect(() => {
        const saveData = (key, data) => {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (e) {
                console.error(`Error saving ${key}:`, e);
            }
        };
        
        saveData('workItems', workItems);
        saveData('tasks', tasks);
        saveData('skills', skills);
        saveData('careerMilestones', careerMilestones);
        saveData('blogPosts', blogPosts);
        saveData('testimonials', testimonials);
        saveData('profile', profile);
        saveData('darkMode', darkMode);
        saveData('currentTheme', currentTheme);
    }, [workItems, tasks, skills, careerMilestones, blogPosts, testimonials, profile, darkMode, currentTheme]);

    // Apply dark mode
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            document.body.style.backgroundColor = '#111827';
        } else {
            document.documentElement.classList.remove('dark');
            document.body.style.backgroundColor = '#f9fafb';
        }
    }, [darkMode]);

    // Event handlers
    const handleAddWork = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newWork = {
            id: Date.now(),
            title: formData.get('workTitle'),
            description: formData.get('workDescription'),
            category: formData.get('workCategory'),
            link: formData.get('workLink'),
            image: formData.get('workImage'),
            date: formData.get('workDate') || new Date().toISOString().split('T')[0],
            tags: formData.get('workTags')?.split(',').map(tag => tag.trim()).filter(tag => tag) || []
        };
        setWorkItems([...workItems, newWork]);
        setShowAddWorkModal(false);
        e.target.reset();
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTask = {
            id: Date.now(),
            name: formData.get('taskName'),
            progress: parseInt(formData.get('taskProgress')) || 0,
            dueDate: formData.get('taskDueDate'),
            priority: formData.get('taskPriority') || 'medium',
            category: formData.get('taskCategory') || 'general'
        };
        setTasks([...tasks, newTask]);
        setShowAddTaskModal(false);
        e.target.reset();
    };

    const handleAddBlog = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const content = formData.get('blogContent') || '';
        const newBlog = {
            id: Date.now(),
            title: formData.get('blogTitle'),
            content: content,
            excerpt: formData.get('blogExcerpt'),
            date: new Date().toISOString().split('T')[0],
            tags: formData.get('blogTags')?.split(',').map(tag => tag.trim()).filter(tag => tag) || [],
            readTime: Math.max(1, Math.ceil(content.split(' ').length / 200))
        };
        setBlogPosts([...blogPosts, newBlog]);
        setShowAddBlogModal(false);
        e.target.reset();
    };

    const handleAddTestimonial = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newTestimonial = {
            id: Date.now(),
            name: formData.get('testimonialName'),
            title: formData.get('testimonialTitle'),
            company: formData.get('testimonialCompany'),
            content: formData.get('testimonialContent'),
            rating: parseInt(formData.get('testimonialRating')) || 5,
            date: new Date().toISOString().split('T')[0]
        };
        setTestimonials([...testimonials, newTestimonial]);
        setShowAddTestimonialModal(false);
        e.target.reset();
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedProfile = {
            name: formData.get('profileName') || 'Your Name',
            title: formData.get('profileTitle') || 'Professional Title',
            bio: formData.get('profileBio') || 'Your professional bio goes here...',
            location: formData.get('profileLocation') || 'Your Location',
            email: formData.get('profileEmail') || 'your.email@example.com',
            phone: formData.get('profilePhone') || '+1 (555) 123-4567',
            website: formData.get('profileWebsite') || 'https://yourwebsite.com',
            linkedin: formData.get('profileLinkedin') || 'https://linkedin.com/in/yourprofile',
            github: formData.get('profileGithub') || 'https://github.com/yourusername',
            photo: profile.photo // Keep existing photo
        };
        setProfile(updatedProfile);
        setShowProfileModal(false);
    };

    const handleAddSkill = () => {
        const skillName = prompt('Enter skill name:');
        const skillLevel = prompt('Enter skill level (0-100):');
        const skillCategory = prompt('Enter skill category (e.g., Frontend, Backend, Tools):');
        if (skillName && skillLevel) {
            const level = Math.max(0, Math.min(100, parseInt(skillLevel) || 0));
            setSkills([...skills, { 
                id: Date.now(), 
                name: skillName, 
                level: level,
                category: skillCategory || 'General'
            }]);
        }
    };

    const handleAddMilestone = () => {
        const title = prompt('Enter milestone title:');
        const date = prompt('Enter date (e.g., Jan 2020):');
        const description = prompt('Enter description:');
        const company = prompt('Enter company/organization (optional):');
        if (title && date && description) {
            setCareerMilestones([...careerMilestones, { 
                id: Date.now(), 
                title, 
                date, 
                description,
                company: company || ''
            }]);
        }
    };

    // Delete handlers
    const handleDelete = (id, items, setItems) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            setItems(items.filter(item => item.id !== id));
        }
    };

    // Filter and search
    const filteredWorkItems = workItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesFilter;
    });

    // Export functionality
    const exportData = () => {
        const data = {
            profile,
            workItems,
            tasks,
            skills,
            careerMilestones,
            blogPosts,
            testimonials,
            exportDate: new Date().toISOString(),
            version: '2.0'
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const currentThemeConfig = themes[currentTheme];

    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: darkMode ? '#111827' : '#f9fafb',
            color: darkMode ? '#ffffff' : '#111827',
            transition: 'all 0.3s ease'
        },
        nav: {
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            width: '100%',
            top: 0,
            zIndex: 50,
            transition: 'all 0.3s ease'
        },
        hero: {
            background: currentThemeConfig.hero,
            color: '#ffffff',
            paddingTop: '6rem',
            paddingBottom: '4rem',
            textAlign: 'center'
        },
        card: {
            backgroundColor: darkMode ? '#374151' : '#ffffff',
            border: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
            borderRadius: '0.5rem',
            padding: '1.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative'
        },
        button: {
            backgroundColor: currentThemeConfig.accent,
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        input: {
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
            borderRadius: '0.5rem',
            backgroundColor: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#ffffff' : '#111827',
            fontSize: '0.875rem'
        },
        modal: {
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
        },
        modalContent: {
            backgroundColor: darkMode ? '#374151' : '#ffffff',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '32rem',
            maxHeight: '90vh',
            overflowY: 'auto'
        },
        progressBar: {
            width: '100%',
            height: '0.5rem',
            backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
            borderRadius: '0.25rem',
            overflow: 'hidden'
        },
        progressFill: {
            height: '100%',
            backgroundColor: currentThemeConfig.accent,
            transition: 'width 0.3s ease'
        }
    };

    return (
        <div style={styles.container}>
            {/* Navigation */}
            <nav style={styles.nav}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
                            {profile.name}'s Portfolio
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Home</a>
                            <a href="#work" style={{ color: 'inherit', textDecoration: 'none' }}>Work</a>
                            <a href="#blog" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a>
                            <a href="#progress" style={{ color: 'inherit', textDecoration: 'none' }}>Progress</a>
                            <a href="#career" style={{ color: 'inherit', textDecoration: 'none' }}>Career</a>
                            <a href="#testimonials" style={{ color: 'inherit', textDecoration: 'none' }}>Testimonials</a>
                            <a href="#contact" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                            
                            <select 
                                value={currentTheme} 
                                onChange={(e) => setCurrentTheme(e.target.value)}
                                style={{ ...styles.input, width: 'auto', fontSize: '0.75rem' }}
                            >
                                {Object.entries(themes).map(([key, theme]) => (
                                    <option key={key} value={key}>{theme.name}</option>
                                ))}
                            </select>

                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                style={{ ...styles.button, backgroundColor: 'transparent', color: 'inherit' }}
                            >
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button
                                onClick={() => setShowProfileModal(true)}
                                style={{ ...styles.button, backgroundColor: 'transparent', color: 'inherit' }}
                            >
                                <Settings size={20} />
                            </button>

                            <button
                                onClick={exportData}
                                style={{ ...styles.button, backgroundColor: 'transparent', color: 'inherit' }}
                            >
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" style={styles.hero}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ 
                            width: '8rem', 
                            height: '8rem', 
                            backgroundColor: '#ffffff', 
                            borderRadius: '50%', 
                            margin: '0 auto 1.5rem', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}>
                            {profile.photo ? (
                                <img src={profile.photo} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <User size={64} color="#6b7280" />
                            )}
                        </div>
                        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>{profile.name}</h1>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', opacity: 0.9, margin: '0 0 1rem 0' }}>{profile.title}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', opacity: 0.9 }}>
                            <MapPin size={16} style={{ marginRight: '0.5rem' }} />
                            <span>{profile.location}</span>
                        </div>
                        <p style={{ fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem', opacity: 0.9 }}>
                            {profile.bio}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <a 
                                href="#work" 
                                style={{ 
                                    backgroundColor: '#ffffff', 
                                    color: currentThemeConfig.accent, 
                                    padding: '0.75rem 2rem', 
                                    borderRadius: '0.5rem', 
                                    fontWeight: '600', 
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                View My Work
                            </a>
                            <button 
                                onClick={exportData}
                                style={{ 
                                    backgroundColor: 'transparent',
                                    color: '#ffffff',
                                    border: '2px solid #ffffff',
                                    padding: '0.75rem 2rem', 
                                    borderRadius: '0.5rem', 
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Download size={16} />
                                Download Resume
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Work Showcase Section */}
            <section id="work" style={{ padding: '4rem 0', backgroundColor: darkMode ? '#111827' : '#ffffff' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>My Work</h2>
                        <p style={{ maxWidth: '42rem', margin: '0 auto', opacity: 0.8 }}>
                            A collection of projects, achievements, and professional work that showcase my skills and experience.
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
                            <input
                                type="text"
                                placeholder="Search work items..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ ...styles.input, paddingLeft: '2.5rem' }}
                            />
                        </div>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            style={{ ...styles.input, width: 'auto', minWidth: '150px' }}
                        >
                            <option value="all">All Categories</option>
                            <option value="project">Projects</option>
                            <option value="achievement">Achievements</option>
                            <option value="certification">Certifications</option>
                            <option value="publication">Publications</option>
                        </select>
                        <button 
                            onClick={() => setShowAddWorkModal(true)} 
                            style={styles.button}
                        >
                            <Plus size={16} />
                            Add Work
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {filteredWorkItems.map(item => (
                            <div key={item.id} style={styles.card}>
                                <button 
                                    onClick={() => handleDelete(item.id, workItems, setWorkItems)} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '0.75rem', 
                                        right: '0.75rem', 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#6b7280', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <X size={18} />
                                </button>
                                {item.image && (
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        style={{ 
                                            width: '100%', 
                                            height: '8rem', 
                                            objectFit: 'cover', 
                                            borderRadius: '0.5rem', 
                                            marginBottom: '1rem' 
                                        }} 
                                    />
                                )}
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>{item.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ 
                                        backgroundColor: currentThemeConfig.accent, 
                                        color: '#ffffff', 
                                        padding: '0.25rem 0.5rem', 
                                        borderRadius: '0.25rem', 
                                        fontSize: '0.75rem' 
                                    }}>
                                        {item.category}
                                    </span>
                                    <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>{item.date}</span>
                                </div>
                                <p style={{ marginBottom: '1rem', opacity: 0.8 }}>{item.description}</p>
                                {item.tags && item.tags.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                        {item.tags.map((tag, index) => (
                                            <span 
                                                key={index} 
                                                style={{ 
                                                    backgroundColor: darkMode ? '#4b5563' : '#f3f4f6', 
                                                    color: darkMode ? '#d1d5db' : '#6b7280',
                                                    padding: '0.25rem 0.5rem', 
                                                    borderRadius: '9999px', 
                                                    fontSize: '0.75rem' 
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {item.link && (
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        style={{ 
                                            color: currentThemeConfig.accent, 
                                            textDecoration: 'none', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.25rem' 
                                        }}
                                    >
                                        <Eye size={16} />
                                        View Project
                                    </a>
                                )}
                            </div>
                        ))}
                        {filteredWorkItems.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', opacity: 0.6 }}>
                                <Briefcase size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No work items found. {searchTerm || filterCategory !== 'all' ? 'Try adjusting your search or filter.' : "Click 'Add Work' to get started!"}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section id="blog" style={{ padding: '4rem 0', backgroundColor: darkMode ? '#1f2937' : '#f9fafb' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Blog & Articles</h2>
                        <p style={{ maxWidth: '42rem', margin: '0 auto 1rem', opacity: 0.8 }}>
                            Thoughts, insights, and knowledge sharing from my professional journey.
                        </p>
                        <button 
                            onClick={() => setShowAddBlogModal(true)} 
                            style={styles.button}
                        >
                            <Plus size={16} />
                            Add Blog Post
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {blogPosts.map(post => (
                            <div key={post.id} style={styles.card}>
                                <button 
                                    onClick={() => handleDelete(post.id, blogPosts, setBlogPosts)} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '0.75rem', 
                                        right: '0.75rem', 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#6b7280', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <X size={18} />
                                </button>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>{post.title}</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>{post.date}</span>
                                    <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{post.readTime} min read</span>
                                </div>
                                <p style={{ marginBottom: '1rem', opacity: 0.8 }}>{post.excerpt}</p>
                                {post.tags && post.tags.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                        {post.tags.map((tag, index) => (
                                            <span 
                                                key={index} 
                                                style={{ 
                                                    backgroundColor: darkMode ? '#4b5563' : '#f3f4f6', 
                                                    color: darkMode ? '#d1d5db' : '#6b7280',
                                                    padding: '0.25rem 0.5rem', 
                                                    borderRadius: '9999px', 
                                                    fontSize: '0.75rem' 
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {blogPosts.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', opacity: 0.6 }}>
                                <FileText size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No blog posts yet. Share your thoughts and insights!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Progress Tracking Section */}
            <section id="progress" style={{ padding: '4rem 0', backgroundColor: darkMode ? '#111827' : '#ffffff' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Current Progress</h2>
                        <p style={{ maxWidth: '42rem', margin: '0 auto', opacity: 0.8 }}>
                            Track my ongoing tasks, goals, and professional development milestones.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                        {/* Active Tasks */}
                        <div style={styles.card}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                                <Target size={20} color={currentThemeConfig.accent} />
                                Active Tasks
                            </h3>
                            <div style={{ marginBottom: '1rem' }}>
                                {tasks.map(task => (
                                    <div key={task.id} style={{ ...styles.card, marginBottom: '1rem', backgroundColor: darkMode ? '#4b5563' : '#f9fafb' }}>
                                        <button 
                                            onClick={() => handleDelete(task.id, tasks, setTasks)} 
                                            style={{ 
                                                position: 'absolute', 
                                                top: '0.75rem', 
                                                right: '0.75rem', 
                                                background: 'none', 
                                                border: 'none', 
                                                color: '#6b7280', 
                                                cursor: 'pointer' 
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: '600', margin: 0 }}>{task.name}</h4>
                                            <span style={{ 
                                                padding: '0.25rem 0.5rem', 
                                                borderRadius: '0.25rem', 
                                                fontSize: '0.75rem',
                                                backgroundColor: task.priority === 'high' ? '#fef2f2' : task.priority === 'medium' ? '#fffbeb' : '#f0fdf4',
                                                color: task.priority === 'high' ? '#dc2626' : task.priority === 'medium' ? '#d97706' : '#16a34a'
                                            }}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', opacity: 0.7, margin: '0 0 0.5rem 0' }}>
                                            Due: {task.dueDate} • {task.category}
                                        </p>
                                        <div style={styles.progressBar}>
                                            <div 
                                                style={{ ...styles.progressFill, width: `${task.progress}%` }}
                                            ></div>
                                        </div>
                                        <p style={{ textAlign: 'right', fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7, margin: '0.5rem 0 0 0' }}>
                                            {task.progress}% Complete
                                        </p>
                                    </div>
                                ))}
                                {tasks.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '2rem 0', opacity: 0.6 }}>
                                        <Target size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                        <p>No active tasks. Time to add some goals!</p>
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={() => setShowAddTaskModal(true)} 
                                style={{ ...styles.button, width: '100%', justifyContent: 'center' }}
                            >
                                Add New Task
                            </button>
                        </div>

                        {/* Skills Progress */}
                        <div style={styles.card}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 1rem 0' }}>
                                <TrendingUp size={20} color={currentThemeConfig.secondary} />
                                Skills Development
                            </h3>
                            <div style={{ marginBottom: '1rem' }}>
                                {skills.map(skill => (
                                    <div key={skill.id} style={{ ...styles.card, marginBottom: '1rem', backgroundColor: darkMode ? '#4b5563' : '#f9fafb' }}>
                                        <button 
                                            onClick={() => handleDelete(skill.id, skills, setSkills)} 
                                            style={{ 
                                                position: 'absolute', 
                                                top: '0.75rem', 
                                                right: '0.75rem', 
                                                background: 'none', 
                                                border: 'none', 
                                                color: '#6b7280', 
                                                cursor: 'pointer' 
                                            }}
                                        >
                                            <X size={16} />
                                        </button>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                            <h4 style={{ fontWeight: '600', margin: 0 }}>{skill.name}</h4>
                                            <span style={{ 
                                                backgroundColor: darkMode ? '#6b7280' : '#f3f4f6', 
                                                color: darkMode ? '#d1d5db' : '#6b7280',
                                                padding: '0.25rem 0.5rem', 
                                                borderRadius: '0.25rem', 
                                                fontSize: '0.75rem' 
                                            }}>
                                                {skill.category}
                                            </span>
                                        </div>
                                        <div style={styles.progressBar}>
                                            <div 
                                                style={{ ...styles.progressFill, backgroundColor: currentThemeConfig.secondary, width: `${skill.level}%` }}
                                            ></div>
                                        </div>
                                        <p style={{ textAlign: 'right', fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7, margin: '0.5rem 0 0 0' }}>
                                            {skill.level}% Proficiency
                                        </p>
                                    </div>
                                ))}
                                {skills.length === 0 && (
                                    <div style={{ textAlign: 'center', padding: '2rem 0', opacity: 0.6 }}>
                                        <Award size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                        <p>No skills added yet. Time to learn something new!</p>
                                    </div>
                                )}
                            </div>
                            <button 
                                onClick={handleAddSkill} 
                                style={{ ...styles.button, backgroundColor: currentThemeConfig.secondary, width: '100%', justifyContent: 'center' }}
                            >
                                Add Skill
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Timeline Section */}
            <section id="career" style={{ padding: '4rem 0', backgroundColor: darkMode ? '#1f2937' : '#f9fafb' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Career Journey</h2>
                        <p style={{ maxWidth: '42rem', margin: '0 auto', opacity: 0.8 }}>
                            My professional timeline showcasing key milestones, achievements, and career progression.
                        </p>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <div style={{ 
                            position: 'absolute', 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            width: '2px', 
                            height: '100%', 
                            backgroundColor: darkMode ? '#4b5563' : '#e5e7eb' 
                        }}></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            {careerMilestones.map((milestone, index) => (
                                <div key={milestone.id} style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    width: '100%',
                                    justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end'
                                }}>
                                    <div style={{ 
                                        width: '45%', 
                                        padding: index % 2 === 0 ? '0 2rem 0 0' : '0 0 0 2rem',
                                        textAlign: index % 2 === 0 ? 'right' : 'left'
                                    }}>
                                        <div style={styles.card}>
                                            <button 
                                                onClick={() => handleDelete(milestone.id, careerMilestones, setCareerMilestones)} 
                                                style={{ 
                                                    position: 'absolute', 
                                                    top: '0.75rem', 
                                                    right: '0.75rem', 
                                                    background: 'none', 
                                                    border: 'none', 
                                                    color: '#6b7280', 
                                                    cursor: 'pointer' 
                                                }}
                                            >
                                                <X size={16} />
                                            </button>
                                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>{milestone.title}</h3>
                                            <p style={{ fontWeight: '500', color: currentThemeConfig.accent, marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
                                                {milestone.date} {milestone.company && `• ${milestone.company}`}
                                            </p>
                                            <p style={{ opacity: 0.8, margin: 0 }}>{milestone.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {careerMilestones.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.6 }}>
                                    <Award size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                    <p>No career milestones added yet. Start building your timeline!</p>
                                </div>
                            )}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button 
                                onClick={handleAddMilestone} 
                                style={{ ...styles.button, backgroundColor: '#8b5cf6' }}
                            >
                                Add Career Milestone
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" style={{ padding: '4rem 0', backgroundColor: darkMode ? '#111827' : '#ffffff' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Testimonials</h2>
                        <p style={{ maxWidth: '42rem', margin: '0 auto 1rem', opacity: 0.8 }}>
                            What colleagues and clients say about working with me.
                        </p>
                        <button 
                            onClick={() => setShowAddTestimonialModal(true)} 
                            style={styles.button}
                        >
                            <Plus size={16} />
                            Add Testimonial
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} style={styles.card}>
                                <button 
                                    onClick={() => handleDelete(testimonial.id, testimonials, setTestimonials)} 
                                    style={{ 
                                        position: 'absolute', 
                                        top: '0.75rem', 
                                        right: '0.75rem', 
                                        background: 'none', 
                                        border: 'none', 
                                        color: '#6b7280', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    <X size={18} />
                                </button>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                                    <Quote size={32} color={currentThemeConfig.accent} style={{ marginRight: '0.75rem' }} />
                                    <div style={{ display: 'flex' }}>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} size={16} color="#fbbf24" fill="#fbbf24" />
                                        ))}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.25rem', margin: '0 0 0.25rem 0' }}>{testimonial.name}</h3>
                                <p style={{ fontSize: '0.875rem', marginBottom: '1rem', opacity: 0.7, margin: '0 0 1rem 0' }}>
                                    {testimonial.title} at {testimonial.company}
                                </p>
                                <p style={{ fontStyle: 'italic', opacity: 0.8, margin: 0 }}>"{testimonial.content}"</p>
                            </div>
                        ))}
                        {testimonials.length === 0 && (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 0', opacity: 0.6 }}>
                                <Quote size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                                <p>No testimonials yet. Add some feedback from colleagues and clients!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ padding: '4rem 0', backgroundColor: darkMode ? '#1f2937' : '#f9fafb' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Get In Touch</h2>
                    <p style={{ marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem', opacity: 0.8 }}>
                        Interested in collaborating or learning more about my work? Let's connect!
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                        <a href={`mailto:${profile.email}`} style={{ ...styles.card, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <Mail size={32} color={currentThemeConfig.accent} style={{ margin: '0 auto 0.5rem' }} />
                            <div style={{ fontWeight: '500' }}>Email</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{profile.email}</div>
                        </a>
                        <a href={`tel:${profile.phone}`} style={{ ...styles.card, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <Phone size={32} color={currentThemeConfig.accent} style={{ margin: '0 auto 0.5rem' }} />
                            <div style={{ fontWeight: '500' }}>Phone</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>{profile.phone}</div>
                        </a>
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ ...styles.card, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <Linkedin size={32} color={currentThemeConfig.accent} style={{ margin: '0 auto 0.5rem' }} />
                            <div style={{ fontWeight: '500' }}>LinkedIn</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Connect</div>
                        </a>
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" style={{ ...styles.card, textDecoration: 'none', color: 'inherit', textAlign: 'center' }}>
                            <Github size={32} color={currentThemeConfig.accent} style={{ margin: '0 auto 0.5rem' }} />
                            <div style={{ fontWeight: '500' }}>GitHub</div>
                            <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>Follow</div>
                        </a>
                    </div>
                    {profile.website && (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ color: currentThemeConfig.accent, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={16} />
                            Visit My Website
                        </a>
                    )}
                </div>
            </section>

            {/* Modals */}
            {showProfileModal && (
                <div style={styles.modal}>
                    <div style={{ ...styles.modalContent, maxWidth: '48rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Profile Settings</h2>
                        <form onSubmit={handleProfileUpdate}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Full Name</label>
                                    <input name="profileName" defaultValue={profile.name} required style={styles.input} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Professional Title</label>
                                    <input name="profileTitle" defaultValue={profile.title} required style={styles.input} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Bio</label>
                                <textarea name="profileBio" defaultValue={profile.bio} rows="3" style={styles.input} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Location</label>
                                    <input name="profileLocation" defaultValue={profile.location} style={styles.input} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Email</label>
                                    <input name="profileEmail" type="email" defaultValue={profile.email} style={styles.input} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone</label>
                                    <input name="profilePhone" defaultValue={profile.phone} style={styles.input} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Website</label>
                                    <input name="profileWebsite" type="url" defaultValue={profile.website} style={styles.input} />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>LinkedIn URL</label>
                                    <input name="profileLinkedin" type="url" defaultValue={profile.linkedin} style={styles.input} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>GitHub URL</label>
                                    <input name="profileGithub" type="url" defaultValue={profile.github} style={styles.input} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button type="submit" style={{ ...styles.button, flex: 1, justifyContent: 'center' }}>
                                    <Save size={16} />
                                    Save Profile
                                </button>
                                <button type="button" onClick={() => setShowProfileModal(false)} style={{ ...styles.button, backgroundColor: '#6b7280', flex: 1, justifyContent: 'center' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddWorkModal && (
                <div style={styles.modal}>
                    <div style={{ ...styles.modalContent, maxWidth: '48rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Add New Work</h2>
                        <form onSubmit={handleAddWork}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Title</label>
                                <input name="workTitle" required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Description</label>
                                <textarea name="workDescription" rows="3" required style={styles.input} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(150px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Category</label>
                                    <select name="workCategory" style={styles.input}>
                                        <option value="project">Project</option>
                                        <option value="achievement">Achievement</option>
                                        <option value="certification">Certification</option>
                                        <option value="publication">Publication</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Date</label>
                                    <input name="workDate" type="date" style={styles.input} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Link (optional)</label>
                                <input name="workLink" type="url" style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Tags (comma-separated)</label>
                                <input name="workTags" placeholder="React, JavaScript, Web Development" style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Image URL (optional)</label>
                                <input name="workImage" type="url" placeholder="https://example.com/image.jpg" style={styles.input} />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button type="submit" style={{ ...styles.button, flex: 1, justifyContent: 'center' }}>Add Work</button>
                                <button type="button" onClick={() => setShowAddWorkModal(false)} style={{ ...styles.button, backgroundColor: '#6b7280', flex: 1, justifyContent: 'center' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddTaskModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Add New Task</h2>
                        <form onSubmit={handleAddTask}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Task Name</label>
                                <input name="taskName" required style={styles.input} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Progress (%)</label>
                                    <input name="taskProgress" type="number" min="0" max="100" defaultValue="0" required style={styles.input} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Priority</label>
                                    <select name="taskPriority" style={styles.input}>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Category</label>
                                <input name="taskCategory" placeholder="e.g., Learning, Project, Personal" style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Due Date</label>
                                <input name="taskDueDate" type="date" style={styles.input} />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button type="submit" style={{ ...styles.button, flex: 1, justifyContent: 'center' }}>Add Task</button>
                                <button type="button" onClick={() => setShowAddTaskModal(false)} style={{ ...styles.button, backgroundColor: '#6b7280', flex: 1, justifyContent: 'center' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddBlogModal && (
                <div style={styles.modal}>
                    <div style={{ ...styles.modalContent, maxWidth: '48rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Add Blog Post</h2>
                        <form onSubmit={handleAddBlog}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Title</label>
                                <input name="blogTitle" required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Excerpt</label>
                                <textarea name="blogExcerpt" rows="2" placeholder="Brief summary of the post..." required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Content</label>
                                <textarea name="blogContent" rows="8" placeholder="Full blog post content..." required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Tags (comma-separated)</label>
                                <input name="blogTags" placeholder="Technology, React, Tutorial" style={styles.input} />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button type="submit" style={{ ...styles.button, flex: 1, justifyContent: 'center' }}>Add Blog Post</button>
                                <button type="button" onClick={() => setShowAddBlogModal(false)} style={{ ...styles.button, backgroundColor: '#6b7280', flex: 1, justifyContent: 'center' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showAddTestimonialModal && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', margin: '0 0 1rem 0' }}>Add Testimonial</h2>
                        <form onSubmit={handleAddTestimonial}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Name</label>
                                <input name="testimonialName" required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Title</label>
                                <input name="testimonialTitle" placeholder="e.g., Senior Developer" required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Company</label>
                                <input name="testimonialCompany" required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Testimonial</label>
                                <textarea name="testimonialContent" rows="4" required style={styles.input} />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Rating (1-5)</label>
                                <input name="testimonialRating" type="number" min="1" max="5" defaultValue="5" required style={styles.input} />
                            </div>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button type="submit" style={{ ...styles.button, flex: 1, justifyContent: 'center' }}>Add Testimonial</button>
                                <button type="button" onClick={() => setShowAddTestimonialModal(false)} style={{ ...styles.button, backgroundColor: '#6b7280', flex: 1, justifyContent: 'center' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

