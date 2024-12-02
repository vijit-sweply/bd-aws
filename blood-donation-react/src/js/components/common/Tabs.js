import React from 'react';

const tabContent = {
  frontend: [
    { name: 'React JS', image: 'reactjs.png' },
    { name: 'Javascript', image: 'javascript.png' },
    { name: 'HTML 5', image: 'html5.png' },
    { name: 'CSS 3', image: 'css3.png' },
  ],
  backend: [
    { name: 'Node JS', image: 'nodejs.png' },
    { name: 'Java', image: 'java.svg' },
    { name: 'Spring Boot', image: 'springboot.png' },
  ],
  database: [
    { name: 'MySQL', image: 'mysql.png' },
    { name: 'MongoDB', image: 'mongodb.png' },
    { name: 'DynamoDB', image: 'dynamodb.png' },
  ],
  'cloud/devops': [
    { name: 'AWS', image: 'aws.png' },
    { name: 'Docker', image: 'docker.png' },
    { name: 'Zenkins', image: 'zenkins.webp' },
  ],
};

const renderContent = currentTab => (
  <div className="flex flex-row frontend justify-evenly">
    {tabContent[currentTab].map(({ name, image }) => (
      <div className="text-center react" key={name}>
        <a href="#?">
          <img className="w-24 h-24 pb-1" src={`images/${image}`} alt="" />
          {name}
        </a>
      </div>
    ))}
  </div>
);

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState('frontend');

  return (
    <div className="flex flex-wrap">
      <div className="w-full">
        <ul
          className="flex flex-row flex-wrap gap-4 py-2 mb-0 list-none"
          role="tablist"
        >
          {Object.keys(tabContent).map(key => (
            <li className="flex-auto mr-2 -mb-px text-center last:mr-0" key={key}>
              <a
                className={
                  `text-sm uppercase px-5 py-3 rounded block leading-normal ${openTab === key
                    ? 'font-bold border-b-4 border-r-0 border-primary-400 text-primary-400'
                    : 'font-medium'}`
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(key);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                {key}
              </a>
            </li>
          ))}
        </ul>
        <div className="relative flex flex-col w-full min-w-0 mb-6 break-words">
          <div className="flex-auto p-4 ">
            <div className="tab-content tab-space">
              {renderContent(openTab)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
