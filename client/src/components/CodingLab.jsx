import React, { useState, useEffect } from 'react';
import { useTheme } from "./ThemeProvider";  

const LiveCodingLab = () => {
  const { theme } = useTheme();  
  console.log(theme);
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [iframeSrc, setIframeSrc] = useState('');

  const baseLinks = {
    python: 'https://onecompiler.com/embed/python/3zx2m7xw7',
    javascript: 'https://onecompiler.com/embed/javascript/3zx2o6k7p',
    java: 'https://onecompiler.com/embed/java/3zx2o7erh',
    c: 'https://onecompiler.com/embed/c/3zx2o8n2h',
    cpp: 'https://onecompiler.com/embed/cpp/3zx2o9qru',
    html: 'https://onecompiler.com/embed/html/3zx2oaf32',
    sql: 'https://onecompiler.com/embed/mysql/3zx2obz78',
    ruby: 'https://onecompiler.com/embed/ruby/3zx2ocpnq',
    php: 'https://onecompiler.com/embed/php/3zx2odsk4',
  };

  useEffect(() => {
    const themeParam = theme === 'dark' ? 'theme=dark' : 'theme=light';
    setIframeSrc(`${baseLinks[selectedLanguage]}?${themeParam}&hideLanguageSelection=true&hideTitle=true`);
  }, [selectedLanguage, theme]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🖥️ Live Coding Playground</h1>
      <div className="mb-6">
        <label htmlFor="language" className="block text-lg font-semibold mb-2">Choose Language:</label>
        <select
          id="language"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 rounded-md w-64"
        >
          <option value="python">🐍 Python</option>
          <option value="javascript">🟨 JavaScript</option>
          <option value="java">☕ Java</option>
          <option value="c">💻 C</option>
          <option value="cpp">🔧 C++</option>
          <option value="html">🌐 HTML/CSS/JS</option>
          <option value="sql">🗄️ MYSQL</option>
          <option value="ruby">💎 Ruby</option>
          <option value="php">🐘 PHP</option>
        </select>
      </div>

      <div className="border rounded-lg overflow-hidden shadow-lg">
        <iframe
          key={iframeSrc}  // Forces re-render on theme or language change
          src={iframeSrc}
          width="100%"
          height="600px"
          allowFullScreen
          title="Live Coding Lab"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  );
};

export default LiveCodingLab;
