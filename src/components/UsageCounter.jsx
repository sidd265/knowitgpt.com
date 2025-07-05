import React from 'react';

const UsageCounter = ({ questionCount, maxQuestions, hasSubmittedForm }) => {
  const isAtLimit = questionCount >= maxQuestions && !hasSubmittedForm;
  
  return (
    <div className="flex items-center space-x-2">
      {hasSubmittedForm ? (
        <div className="text-green-400 text-sm font-medium">
          Unlimited access
        </div>
      ) : (
        <div className={`text-sm font-medium ${
          isAtLimit ? 'text-red-400' : questionCount >= maxQuestions - 1 ? 'text-yellow-400' : 'text-gray-400'
        }`}>
          {questionCount} / {maxQuestions} free questions used
        </div>
      )}
      
      {isAtLimit && (
        <div className="ml-2 px-2 py-1 bg-red-600 text-white text-xs rounded-md">
          Limit reached
        </div>
      )}
    </div>
  );
};

export default UsageCounter; 