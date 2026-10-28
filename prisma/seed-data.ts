export const PROFILE_ID = 'main';

export const seedData = {
  profile: {
    id: PROFILE_ID,
    name: 'Гурский Владимир',
    description:
      'Backend-разработчик и просто хороший человек',
  },
  links: [
    { title: 'GitHub', url: 'https://github.com/FeedokTV' },
    { title: 'LinkedIn', url: 'https://www.linkedin.com/in/vladimirgurskii' },
    { title: 'Telegram', url: 'https://t.me/feedok' },
  ],
  skills: [
    { name: 'TypeScript', category: 'Languages' },
    { name: 'JavaScript', category: 'Languages' },
    { name: 'Golang', category: 'Languages' },
    { name: 'Python', category: 'Languages' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'GraphQL', category: 'Backend' },
    { name: 'REST API', category: 'Backend' },
    { name: 'Kafka', category: 'Backend' },
    { name: 'React', category: 'Frontend' },
    { name: 'PostgreSQL', category: 'Databases' },
    { name: 'Prisma', category: 'Databases' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Git', category: 'Tools' },
  ],
  experience: [
    {
      company: 'Kaspersky',
      position: 'Research Developer',
      startDate: new Date('2025-02-25'),
      endDate: new Date('2026-06-30'),
      achievements: [
        'Разработал сканер на основе LLM и YARA, ежедневно обрабатывающий 30 000+ навыков (skills) AI-агентов; интегрировал результаты в веб-приложение на Go/React, упростив аналитикам разработку логики детектирования',
        'Спроектировал и разработал портал threat intelligence: модульный монолит на Go, React, PostgreSQL и Kafka. Спроектировал REST API, реализовал Kafka-консьюмеры и пайплайны обработки данных, обеспечил ретроспективный анализ и корреляцию между источниками. Обработка семейств угроз ускорилась примерно в 3 раза',
        'Совместно с командой инфраструктуры настроил CI/CD-пайплайн',
        'Автоматизировал проверку IoC и процессы анализа угроз, что дало прирост новых детектов примерно на 30%',
        'Разработал систему анализа веб-сайтов на Python/Playwright, ежедневно обрабатывающую 1 000+ подозрительных сайтов, с LLM-анализом JavaScript и автоматическими оповещениями аналитиков',
        'Соавтор 5 опубликованных исследований по информационной безопасности (NPM-червь Shai Hulud, компрометация LiteLLM, AI-агент как macOS-стилер, кампания SilverFox, вредоносный фреймворк в NPM-пакете)',
      ],
    },
    {
      company: 'Фриланс (самозанятость)',
      position: 'Software Engineer',
      startDate: new Date('2022-05-01'),
      endDate: new Date('2025-05-31'),
      achievements: [
        'Разрабатывал production-решения для клиентов из телеком- и логистической отраслей: backend, пайплайны данных, автоматизация бизнес-процессов',
        'Построил микросервисную платформу конкурентной аналитики для телеком-клиента на Go, Python, Kafka, PostgreSQL и React: пайплайны сбора данных и аналитический дашборд. Система с 2025 года ежедневно используется командой аналитиков клиента',
        'Разработал систему автоматизации логистики с интеграцией Telegram Bot API и Bitrix CRM: централизовал диспетчеризацию и автоматизировал распределение заявок между водителями и грузчиками. Время назначения водителя на заявку сократилось с ~2 часов до ~10 минут',
      ],
    },
  ],
  projects: [
    {
      name: 'Vizitka',
      url: 'https://github.com/FeedokTV/Vizitka-JS',
      description: 'Цифровая визитка: NestJS + GraphQL + Prisma + Docker',
    },
  ],
};
