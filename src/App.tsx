import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, TrendingUp, Calendar, Zap } from 'lucide-react';

const RAW_DATA = [
  {source_phrase: "the program and the project", target_phrase: "het programma en het project", target_language: "nl"},
  {source_phrase: "walking", target_phrase: "wandelen", target_language: "nl"},
  {source_phrase: "thirty-one", target_phrase: "treinta y uno", target_language: "es"},
  {source_phrase: "mayor", target_phrase: "sindaco", target_language: "it"},
  {source_phrase: "theocracy", target_phrase: "Theokratie", target_language: "de"},
  {source_phrase: "the coffee machine", target_phrase: "la machine à café", target_language: "fr"},
  {source_phrase: "I won't read all of this to you.", target_phrase: "no te leeré todo esto", target_language: "es"},
  {source_phrase: "with an accent", target_phrase: "con acento", target_language: "es"},
  {source_phrase: "suddenly", target_phrase: "di colpo", target_language: "it"},
  {source_phrase: "Friday", target_phrase: "Venerdì", target_language: "it"},
  {source_phrase: "paper towels", target_phrase: "serviettes en papier", target_language: "fr"},
  {source_phrase: "so far", target_phrase: "tot nu toe", target_language: "nl"},
  {source_phrase: "congratulations", target_phrase: "Gefeliciteerd", target_language: "nl"},
  {source_phrase: "to understand", target_phrase: "begrijpen", target_language: "nl"}
];

const LANGUAGE_NAMES = {
  nl: 'Dutch',
  es: 'Spanish',
  it: 'Italian',
  fr: 'French',
  de: 'German'
};

const LANGUAGE_COLORS = {
  nl: '#FF6B6B',
  es: '#4ECDC4',
  it: '#45B7D1',
  fr: '#96CEB4',
  de: '#FFEAA7'
};

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedPhrase, setSelectedPhrase] = useState(null);

  const languageStats = useMemo(() => {
    const stats = {};
    RAW_DATA.forEach(item => {
      if (!stats[item.target_language]) {
        stats[item.target_language] = 0;
      }
      stats[item.target_language]++;
    });
    return Object.entries(stats).map(([lang, count]) => ({
      language: LANGUAGE_NAMES[lang] || lang,
      code: lang,
      count: count,
      color: LANGUAGE_COLORS[lang] || '#999999'
    }));
  }, []);

  const filteredData = useMemo(() => {
    if (selectedLanguage === 'all') return RAW_DATA;
    return RAW_DATA.filter(item => item.target_language === selectedLanguage);
  }, [selectedLanguage]);

  const totalPhrases = RAW_DATA.length;

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    // setSelectedPhrase(null);
  };

  const handlePhraseClick = (phrase) => {
    setSelectedPhrase(phrase);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-2">
            🌍 Comprehensible Output Progress
          </h1>
          <p className="text-xl text-gray-600">Your multilingual learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Phrases</p>
                <p className="text-3xl font-bold text-purple-600">{totalPhrases}</p>
              </div>
              <BookOpen className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Languages</p>
                <p className="text-3xl font-bold text-blue-600">{languageStats.length}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-blue-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Top Language</p>
                <p className="text-2xl font-bold text-green-600">
                  {languageStats.length > 0 && languageStats.sort((a, b) => b.count - a.count)[0].language}
                </p>
              </div>
              <Zap className="w-12 h-12 text-green-400" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Days</p>
                <p className="text-3xl font-bold text-pink-600">3</p>
              </div>
              <Calendar className="w-12 h-12 text-pink-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Language Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={languageStats}
                  dataKey="count"
                  nameKey="language"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.language}: ${entry.count}`}
                >
                  {languageStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Phrases by Language</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={languageStats}>
                <XAxis dataKey="language" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {languageStats.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Filter by Language</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleLanguageSelect('all')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedLanguage === 'all'
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Languages ({totalPhrases})
            </button>
            {languageStats.map(stat => (
              <button
                key={stat.code}
                onClick={() => handleLanguageSelect(stat.code)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedLanguage === stat.code
                    ? 'text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={selectedLanguage === stat.code ? { backgroundColor: stat.color } : {}}
              >
                {stat.language} ({stat.count})
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Phrase Explorer
            {selectedLanguage !== 'all' && ` - ${LANGUAGE_NAMES[selectedLanguage]}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
            {filteredData.map((phrase, idx) => (
              <div
                key={`phrase-${idx}`}
                onClick={() => handlePhraseClick(phrase)}
                className="p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md"
                style={{
                  borderColor: LANGUAGE_COLORS[phrase.target_language],
                  backgroundColor: selectedPhrase === phrase ? `${LANGUAGE_COLORS[phrase.target_language]}20` : 'white'
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-600">
                    {LANGUAGE_NAMES[phrase.target_language]}
                  </p>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: LANGUAGE_COLORS[phrase.target_language] }}
                  >
                    {phrase.target_language.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-700 mb-1">
                  <span className="font-semibold">EN:</span> {phrase.source_phrase}
                </p>
                <p className="text-lg font-bold" style={{ color: LANGUAGE_COLORS[phrase.target_language] }}>
                  {phrase.target_phrase}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Keep up the amazing work! 🎉 You're on your way to becoming a true polyglot! 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default App;

