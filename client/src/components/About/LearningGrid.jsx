// import React from "react";
// import { Link } from "react-router-dom";

// const LearningGridArray = [
//   {
//     order: -1,
//     heading: "World-Class Learning for",
//     highlightText: "Anyone, Anywhere",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
//     BtnText: "Learn More",
//     BtnLink: "/",
//   },
//   {
//     order: 1,
//     heading: "Curriculum Based on Industry Needs",
//     description:
//       "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
//   },
//   {
//     order: 2,
//     heading: "Our Learning Methods",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 3,
//     heading: "Certification",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 4,
//     heading: `Rating "Auto-grading"`,
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
//   {
//     order: 5,
//     heading: "Ready to Work",
//     description:
//       "Studynotion partners with more than 275+ leading universities and companies to bring",
//   },
// ];

// const LearningGrid = () => {
//   return (
//     <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
//       {LearningGridArray.map((card, i) => {
//         return (
//           <div
//             key={i}
//             className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
//               card.order % 2 === 1
//                 ? "bg-richblack-700 h-[294px]"
//                 : card.order % 2 === 0
//                 ? "bg-richblack-800 h-[294px]"
//                 : "bg-transparent"
//             } ${card.order === 3 && "xl:col-start-2"}  `}
//           >
//             {card.order < 0 ? (
//               <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
//                 <div className="text-4xl font-semibold ">
//                   {card.heading}
//                   <HighlightText text={card.highlightText} />
//                 </div>
//                 <p className="text-richblack-300 font-medium">
//                   {card.description}
//                 </p>

//                 <div className="w-fit mt-2">
//                   <CTAButton active={true} linkto={card.BtnLink}>
//                     {card.BtnText}
//                   </CTAButton>
//                 </div>
//               </div>
//             ) : (
//               <div className="p-8 flex flex-col gap-8">
//                 <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

//                 <p className="text-richblack-300 font-medium">
//                   {card.description}
//                 </p>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default LearningGrid;

// const HighlightText = ({text}) => {
//     return (
//       <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
//         {" "}
//         {text}
//       </span>
//     );
//   };

  
//   const CTAButton = ({ children, active, linkto }) => {
//     return (
//       <Link to={linkto}>
//         <div
//           className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${
//             active ? "bg-yellow-50 text-black " : "bg-richblack-800"
//           } hover:shadow-none hover:scale-95 transition-all duration-200 `}
//         >
//           {children}
//         </div>
//       </Link>
//     );
//   };
  
import React from "react";
import { Link } from "react-router-dom";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for ",
    highlightText: "Anyone, Anywhere",
    description:
      "Code-Catalyst partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Code-Catalyst partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Code-Catalyst partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Code-Catalyst partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Code-Catalyst partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  
              ${
                card.order % 2 === 1
                  ? "bg-gray-200 dark:bg-gray-700 h-[294px]"
                  : card.order % 2 === 0
                  ? "bg-gray-300 dark:bg-gray-800 h-[294px]"
                  : "bg-transparent"
              } ${card.order === 3 && "xl:col-start-2"}  `}
          >
            {card.order < 0 ? (
              <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                <div className="text-4xl font-semibold text-gray-900 dark:text-white">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {card.description}
                </p>

                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col gap-8">
                <h1 className="text-gray-900 dark:text-gray-100 text-lg">
                  {card.heading}
                </h1>

                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;

const HighlightText = ({ text }) => {
  return (
    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
      {text}
    </span>
  );
};

const CTAButton = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] sm:text-[16px] px-6 py-3 rounded-md font-bold 
          shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
          ${
            active
              ? "bg-sky-400 text-black"
              : "bg-gray-300 dark:bg-richblack-800"
          } 
          hover:shadow-none hover:scale-95 transition-all duration-200`}
      >
        {children}
      </div>
    </Link>
  );
};
