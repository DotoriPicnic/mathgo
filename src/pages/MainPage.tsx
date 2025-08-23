import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navigation from "../components/Navigation";

const MainPage: React.FC = () => {
  const { t } = useTranslation();
  
  const popularUnits = [
    {
      title: "덧셈과 뺄셈",
      description: "기본 연산 마스터하기",
      icon: "➕",
      color: "bg-blue-500",
      path: "/elem"
    },
    {
      title: "곱셈과 나눗셈",
      description: "구구단부터 나눗셈까지",
      icon: "✖️",
      color: "bg-teal-500",
      path: "/elem"
    },
    {
      title: "분수 연산",
      description: "분수의 덧셈과 뺄셈",
      icon: "🔢",
      color: "bg-yellow-500",
      path: "/elem"
    },
    {
      title: "소수 연산",
      description: "소수점 계산 연습",
      icon: "📊",
      color: "bg-purple-500",
      path: "/elem"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('mainTitle')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('mainSubtitle')}
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              {t('mainDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/elem" className="btn-primary text-lg px-8 py-4">
                {t('startButton')}
              </Link>
              <button className="btn-secondary text-lg px-8 py-4">
                무료 체험하기
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-teal-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Popular Units Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              인기 단원
            </h2>
            <p className="text-lg text-gray-600">
              가장 많이 풀리는 수학 문제들을 확인해보세요
            </p>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {popularUnits.map((unit, index) => (
              <Link
                key={index}
                to={unit.path}
                className="card group cursor-pointer"
              >
                <div className={`w-16 h-16 ${unit.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{unit.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {unit.title}
                </h3>
                <p className="text-gray-600">
                  {unit.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Mobile Scroll */}
          <div className="lg:hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {popularUnits.map((unit, index) => (
                <Link
                  key={index}
                  to={unit.path}
                  className="card min-w-[280px] group cursor-pointer"
                >
                  <div className={`w-16 h-16 ${unit.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{unit.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {unit.title}
                  </h3>
                  <p className="text-gray-600">
                    {unit.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              주요 기능
            </h2>
            <p className="text-lg text-gray-600">
              Calcuri만의 특별한 학습 도구들을 경험해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('featureCard1.title')}
              </h3>
              <p className="text-gray-600">
                {t('featureCard1.description')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('featureCard2.title')}
              </h3>
              <p className="text-gray-600">
                {t('featureCard2.description')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('featureCard3.title')}
              </h3>
              <p className="text-gray-600">
                {t('featureCard3.description')}
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('featureCard4.title')}
              </h3>
              <p className="text-gray-600">
                {t('featureCard4.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {t('footerDescription')}
            </p>
            <p className="text-gray-600">
              {t('contactEmail')} 
              <a 
                href="mailto:calcuriofficial@gmail.com" 
                className="text-blue-600 hover:text-blue-700 underline ml-1"
              >
                calcuriofficial@gmail.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage; 