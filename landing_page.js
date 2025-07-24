import React, { useState, useEffect, useRef } from 'react';
import { Home, User, Code, Briefcase, Brain, Mail, MessageSquare, Send, X } from 'lucide-react';
import './landing_page.css'; // Importa los estilos personalizados

const PROFILE = {
    name: 'Kelvin Cárima',
    linkedin: 'https://www.linkedin.com/feed/',
};

const App = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const sectionsRef = useRef({});

    const scrollToSection = (id) => {
        const section = sectionsRef.current[id];
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sectionIds = [
                'hero',
                'about',
                'skills-projects',
                'experience',
                'innovation-ai',
                'chatbot',
                'contact'
            ];
            let current = 'hero';
            for (const id of sectionIds) {
                const el = sectionsRef.current[id];
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        current = id;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 font-inter text-gray-800">
            <Navbar activeSection={activeSection} scrollToSection={scrollToSection} profile={PROFILE} />
            <main className="container mx-auto px-4 py-8">
                <section id="hero" ref={el => (sectionsRef.current.hero = el)} className="min-h-screen flex items-center justify-center text-center p-6">
                    <Hero profile={PROFILE} />
                </section>
                <section id="about" ref={el => (sectionsRef.current.about = el)} className="py-20 px-6 bg-white rounded-3xl shadow-xl my-12">
                    <About />
                </section>
                <section id="skills-projects" ref={el => (sectionsRef.current['skills-projects'] = el)} className="py-20 px-6 bg-blue-50 rounded-3xl shadow-xl my-12">
                    <SkillsProjects />
                </section>
                <section id="experience" ref={el => (sectionsRef.current.experience = el)} className="py-20 px-6 bg-white rounded-3xl shadow-xl my-12">
                    <Experience />
                </section>
                <section id="innovation-ai" ref={el => (sectionsRef.current['innovation-ai'] = el)} className="py-20 px-6 bg-purple-50 rounded-3xl shadow-xl my-12">
                    <InnovationAI />
                </section>
                <section id="chatbot" ref={el => (sectionsRef.current.chatbot = el)} className="py-20 px-6 bg-white rounded-3xl shadow-xl my-12">
                    <Chatbot profile={PROFILE} />
                </section>
                <section id="contact" ref={el => (sectionsRef.current.contact = el)} className="py-20 px-6 bg-blue-50 rounded-3xl shadow-xl my-12">
                    <Contact profile={PROFILE} />
                </section>
            </main>
            <footer className="py-8 text-center text-gray-600">
                <p>&copy; 2025 {PROFILE.name}. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

const Navbar = ({ activeSection, scrollToSection, profile }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { id: 'hero', name: 'Inicio', icon: Home },
        { id: 'about', name: 'Sobre Mí', icon: User },
        { id: 'skills-projects', name: 'Habilidades y Proyectos', icon: Code },
        { id: 'experience', name: 'Experiencia', icon: Briefcase },
        { id: 'innovation-ai', name: 'Innovación e IA', icon: Brain },
        { id: 'chatbot', name: 'Chatbot IA', icon: MessageSquare },
        { id: 'contact', name: 'Contacto', icon: Mail },
    ];
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm shadow-md rounded-b-3xl px-6 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-blue-700">{profile.name}</div>
                <div className="hidden md:flex space-x-6">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300
                                ${activeSection === item.id ? 'bg-blue-200 text-blue-800 shadow-inner' : 'text-gray-600 hover:bg-blue-100 hover:text-blue-700'}`}
                            aria-current={activeSection === item.id ? "page" : undefined}
                        >
                            <item.icon size={18} />
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </div>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-gray-600 focus:outline-none"
                        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        {isOpen ? (
                            <X size={24} />
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg py-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => {
                                scrollToSection(item.id);
                                setIsOpen(false);
                            }}
                            className={`block w-full text-left px-4 py-2 text-lg transition-all duration-300
                                ${activeSection === item.id ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
                            aria-current={activeSection === item.id ? "page" : undefined}
                        >
                            <item.icon size={20} className="inline-block mr-2 align-middle" />
                            <span className="align-middle">{item.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [isChatOpen, setIsChatOpen] = useState(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (input.trim() === '') return;
        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const systemPrompt = `Eres un asistente de IA que representa a un experto en programación con más de 20 años de experiencia, especializado en gestión de proyectos de tecnología, desarrollo de sistemas y nuevas tecnologías como blockchain y experiencias inmersivas. Has trabajado extensamente en roles gerenciales y académicos. Eres co-creador de la página principal de UNEG (uneg.edu.ve) y administrador de sus aulas virtuales (moodle.uneg.edu.ve). Actualmente, estás cursando una Maestría en Tecnología de la Información en la UNEG y te estás desarrollando en blockchain y simulaciones con experiencias inmersivas dentro de la Dirección de Sistemas Automatizados Inteligentes de la UNEG. Responde a las preguntas de manera sincera, profesional y concisa, basándote en esta información. Si una pregunta está fuera de tu alcance o no se relaciona con tu perfil profesional, indícalo amablemente.`;

            let chatHistory = [];
            chatHistory.push({ role: "user", parts: [{ text: systemPrompt }] });
            messages.forEach(msg => {
                chatHistory.push({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
            });
            chatHistory.push({ role: "user", parts: [{ text: input }] });

            const payload = { contents: chatHistory };
            const apiKey = ""; // Coloca tu API Key aquí para producción
            if (!apiKey) {
                setMessages(prev => [...prev, { sender: 'ai', text: "El chatbot no está disponible. Falta la API Key." }]);
                setIsLoading(false);
                return;
            }
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            if (result.candidates && result.candidates.length > 0 &&
                    result.candidates[0].content && result.candidates[0].content.parts &&
                    result.candidates[0].content.parts.length > 0) {
                const aiText = result.candidates[0].content.parts[0].text;
                setMessages(prev => [...prev, { sender: 'ai', text: aiText }]);
            } else {
                setMessages(prev => [...prev, { sender: 'ai', text: "Lo siento, no pude generar una respuesta en este momento. Por favor, intenta de nuevo." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "Hubo un error al conectar con el asistente. Por favor, inténtalo más tarde." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto text-center relative">
            <h2 className="text-4xl font-bold text-blue-700 mb-8">Mi Doble Digital: Chatbot IA</h2>
            <p className="text-lg text-gray-700 mb-6">
                ¡Pregúntale a mi asistente de IA sobre mi perfil profesional, experiencia o proyectos!
            </p>
            {!isChatOpen && (
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="fixed bottom-8 right-8 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-110 z-50"
                    aria-label="Abrir Chatbot"
                >
                    <MessageSquare size={32} />
                </button>
            )}
            {isChatOpen && (
                <div className="fixed bottom-8 right-8 w-80 md:w-96 h-[450px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-blue-200">
                    <div className="flex justify-between items-center bg-blue-600 text-white p-4 rounded-t-2xl">
                        <h3 className="text-lg font-semibold">Asistente IA de {profile.name}</h3>
                        <button onClick={() => setIsChatOpen(false)} className="text-white hover:text-gray-200" aria-label="Cerrar Chatbot">
                            <X size={24} />
                        </button>
                    </div>
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 mt-10">
                                <MessageSquare size={48} className="mx-auto mb-2" />
                                <p>¡Hola! ¿En qué puedo ayudarte hoy?</p>
                            </div>
                        )}
                        {messages.map((msg, index) => (
                            <div key={index} className={`mb-3 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <div
                                    className={`inline-block px-4 py-2 rounded-xl max-w-[80%] ${
                                        msg.sender === 'user'
                                            ? 'bg-blue-100 text-blue-800 rounded-br-none'
                                            : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="text-left mb-3">
                                <div className="inline-block px-4 py-2 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none">
                                    <div className="flex items-center">
                                        <span className="dot-flashing"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 border-t border-gray-200 flex">
                        <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Haz una pregunta..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') handleSendMessage(); }}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSendMessage}
                            className="ml-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                            disabled={isLoading}
                            aria-label="Enviar mensaje"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const Contact = ({ profile }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = e => {
        e.preventDefault();
        setStatusMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatusMessage(''), 5000);
    };
    return (
        <div className="max-w-xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-purple-700 mb-8">Conéctate Conmigo</h2>
            <p className="text-lg text-gray-700 mb-8">
                ¿Tienes un proyecto en mente o simplemente quieres saludar? ¡No dudes en contactarme!
            </p>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg text-left space-y-6">
                <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Tu Nombre"
                        required
                        autoComplete="name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="tu.email@ejemplo.com"
                        required
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Mensaje</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Tu mensaje..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 w-full"
                >
                    Enviar Mensaje
                </button>
                {statusMessage && (
                    <p className="mt-4 text-center text-green-600 font-semibold">{statusMessage}</p>
                )}
            </form>
            <div className="mt-10 text-center">
                <h3 className="text-2xl font-bold text-blue-700 mb-4">Encuéntrame en:</h3>
                <div className="flex justify-center space-x-6">
                    <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center space-x-2"
                        aria-label="LinkedIn"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="inline-block">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        <span className="sr-only">LinkedIn</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
