import React from 'react';

const Rule30Rule = ({ pattern, result }) => {
  const [left, center, right] = pattern.split('');
  
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center space-x-1 mb-1">
        <div className={`w-6 h-6 border ${left === '1' ? 'bg-black' : 'bg-white'}`}></div>
        <div className={`w-6 h-6 border ${center === '1' ? 'bg-black' : 'bg-white'}`}></div>
        <div className={`w-6 h-6 border ${right === '1' ? 'bg-black' : 'bg-white'}`}></div>
      </div>
      <div className="w-6 h-6 border flex items-center justify-center">
        <div className={`w-4 h-4 rounded-full ${result === '1' ? 'bg-black' : 'bg-white border border-gray-300'}`}></div>
      </div>
    </div>
  );
};

const Rule30Rules = () => {
  const rules = [
    { pattern: '111', result: '0' },
    { pattern: '110', result: '1' },
    { pattern: '101', result: '1' },
    { pattern: '100', result: '1' },
    { pattern: '011', result: '1' },
    { pattern: '010', result: '0' },
    { pattern: '001', result: '1' },
    { pattern: '000', result: '0' }
  ];

  return (
    <div className="bg-blue-50 p-6 rounded-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">Reglas de la Regla 30</h2>
      <div className="grid grid-cols-4 gap-6">
        {rules.map((rule, index) => (
          <div key={index} className="flex flex-col items-center">
            <Rule30Rule pattern={rule.pattern} result={rule.result} />
            <div className="mt-2 text-xs text-gray-600">
              {rule.pattern} → {rule.result}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-gray-600">
        Cada regla muestra el patrón de entrada (arriba) y el resultado (abajo).
        Un cuadrado negro representa 1 y uno blanco representa 0.
      </p>
    </div>
  );
};

export default Rule30Rules;
