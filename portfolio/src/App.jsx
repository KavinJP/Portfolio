import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Cpu, 
  Database, 
  Globe,
  Award,
  BookOpen,
  ChevronDown
} from 'lucide-react';

// --- Mock Data ---

const PROFILE = {
  name: "Kavin",
  role: "CSE Student & Full Stack Developer",
  college: "Coimbatore Institute of Technology",
  bio: "I'm a passionate Computer Science student at CIT, eager to build scalable web applications and explore the frontiers of AI. I bridge the gap between complex backend logic and intuitive frontend design.",
  email: "kavin.cse@cit.edu.in", // Placeholder
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:kavin@example.com"
  }
};

const SKILLS = [
  { category: "Frontend", icon: <Globe size={20} />, items: ["React", "Tailwind CSS", "TypeScript", "Next.js", "Framer Motion"] },
  { category: "Backend", icon: <Terminal size={20} />, items: ["Node.js", "Express", "Python", "FastAPI", "Java"] },
  { category: "Database", icon: <Database size={20} />, items: ["PostgreSQL", "MongoDB", "MySQL", "Redis"] },
  { category: "Tools", icon: <Cpu size={20} />, items: ["Git", "Docker", "Linux", "VS Code", "Postman"] },
];

const PROJECTS = [
  {
    title: "AI Study Companion",
    description: "An adaptive learning platform using OpenAI API to generate personalized quizzes and study summaries for college students.",
    tags: ["React", "Python", "OpenAI", "Tailwind"],
    link: "#",
    github: "#",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "EcoTrack Analytics",
    description: "IoT dashboard visualization tool monitoring energy consumption across CIT campus buildings in real-time.",
    tags: ["IoT", "React", "Node.js", "Recharts"],
    link: "#",
    github: "#",
    color: "from-emerald-500 to-teal-500"
  },
  {
    title: "Algorithmic Trading Bot",
    description: "A Python-based bot that executes trades based on technical indicators and sentiment analysis of financial news.",
    tags: ["Python", "Pandas", "AWS", "API"],
    link: "#",
    github: "#",
    color: "from-purple-500 to-pink-500"
  }
];

// --- Components ---

const Navbar = ({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }) => {
  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Kavin<span className="text-indigo-500">.</span>dev
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.id 
                      ? 'text-indigo-400 bg-slate-800' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  scrollToSection(link.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ scrollToSection }) => (
  <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
    {/* Background Decorations */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
        🚀 Aspiring Software Engineer from CIT
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
        Hi, I'm <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">{PROFILE.name}</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Building the future with code. Specialized in full-stack development and solving complex problems with modern technologies.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => scrollToSection('projects')}
          className="px-8 py-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
        >
          View Work <Code2 size={20} />
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="px-8 py-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition-all flex items-center gap-2"
        >
          Contact Me <Mail size={20} />
        </button>
      </div>

      <div className="mt-20 animate-bounce">
        <button onClick={() => scrollToSection('about')} className="text-slate-500 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </button>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-20 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl bg-slate-800 p-1">
             {/* Using a placeholder gradient instead of a real image to prevent broken links */}
            <div className="rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 aspect-square flex items-center justify-center overflow-hidden">
               <span className="text-9xl">👨‍💻</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 flex items-center gap-3">
            <BookOpen className="text-indigo-400" /> About Me
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">
            {PROFILE.bio}
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                <Award size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">Education</h4>
                <p className="text-slate-400">B.E. Computer Science & Engineering</p>
                <p className="text-slate-500 text-sm">{PROFILE.college}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                <Terminal size={24} />
              </div>
              <div>
                <h4 className="text-white font-semibold">Experience</h4>
                <p className="text-slate-400">Freelance Web Developer</p>
                <p className="text-slate-500 text-sm">2023 - Present</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Skills = () => (
  <section id="skills" className="py-20 bg-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A curated list of technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {SKILLS.map((skillGroup, idx) => (
          <div key={idx} className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                {skillGroup.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{skillGroup.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((item, i) => (
                <span key={i} className="px-3 py-1 rounded-full text-sm bg-slate-800 text-slate-300 border border-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="py-20 bg-slate-900">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Projects</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Some of the recent work I've done during my time at CIT.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-2">
            <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex gap-3">
                  <a href={project.github} className="text-slate-400 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                  <a href={project.link} className="text-slate-400 hover:text-white transition-colors">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-2 py-1 rounded bg-slate-700 text-indigo-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-20 bg-slate-800/30">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Let's Connect</h2>
      <p className="text-slate-400 mb-12 text-lg">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <a href={PROFILE.social.email} className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-indigo-500 transition-all group">
          <Mail className="w-8 h-8 mx-auto mb-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">Email</h3>
          <p className="text-slate-500 text-sm">Drop me a line</p>
        </a>
        <a href={PROFILE.social.linkedin} className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500 transition-all group">
          <Linkedin className="w-8 h-8 mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">LinkedIn</h3>
          <p className="text-slate-500 text-sm">Professional profile</p>
        </a>
        <a href={PROFILE.social.github} className="p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-purple-500 transition-all group">
          <Github className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
          <h3 className="text-white font-semibold mb-1">GitHub</h3>
          <p className="text-slate-500 text-sm">Check my code</p>
        </a>
      </div>

      <footer className="pt-8 border-t border-slate-800">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Kavin. Built with React & Tailwind.
        </p>
      </footer>
    </div>
  </section>
);

// --- Main App Component ---

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">
      <Navbar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main>
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}