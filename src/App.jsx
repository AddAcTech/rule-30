import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [iterations, setIterations] = useState(100);
  const [centralColumn, setCentralColumn] = useState('');

  // Función para aplicar la Regla 30
  const applyRule30 = (currentState) => {
    const nextState = currentState.map((_, i) => {
      const left = currentState[i - 1] || 0;
      const center = currentState[i];
      const right = currentState[i + 1] || 0;
      
      // 000 -> 0
      // 001 -> 1
      // 010 -> 1
      // 011 -> 1
      // 100 -> 1
      // 101 -> 0
      // 110 -> 1
      // 111 -> 0
      
      // Convertimos los valores a un número de 3 bits
      const pattern = (left << 2) | (center << 1) | right;
      // Usamos el operador & con 30 (00011110 en binario) para aplicar la regla
      return (30 & (1 << pattern)) ? 1 : 0;
    });
    return nextState;
  };

  // Función para generar la matriz de la Regla 30
  const generateRule30 = (numIterations) => {
    // Inicializar con una sola celda activa en el centro
    const width = numIterations * 2 + 1;
    const initialState = new Array(width).fill(0);
    initialState[Math.floor(width / 2)] = 1;
    
    const result = [initialState];
    let currentState = initialState;
    
    for (let i = 0; i < numIterations - 1; i++) {
      currentState = applyRule30(currentState);
      result.push(currentState);
    }
    
    // Extraer la columna central
    const central = result.map(row => row[Math.floor(width / 2)]);
    setCentralColumn(central.join(''));
    
    return result;
  };

  useEffect(() => {
    const canvas = document.getElementById('rule30-canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const result = generateRule30(iterations);
    const cellSize = 2;
    const width = result[0].length;
    const height = result.length;

    canvas.width = width * cellSize;
    canvas.height = height * cellSize;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    result.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      });
    });
  }, [iterations]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Regla 30 de Wolfram</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-3">Reglas de la Regla 30</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">0</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">0</span>
              <span className="text-xl">0</span>
              <span className="text-xl">0</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">0</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">0</span>
              <span className="text-xl">0</span>
              <span className="text-xl">1</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">0</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">0</span>
              <span className="text-xl">1</span>
              <span className="text-xl">0</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">1</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">0</span>
              <span className="text-xl">1</span>
              <span className="text-xl">1</span>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">1</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">1</span>
              <span className="text-xl">0</span>
              <span className="text-xl">0</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">1</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">1</span>
              <span className="text-xl">0</span>
              <span className="text-xl">1</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">1</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">1</span>
              <span className="text-xl">1</span>
              <span className="text-xl">0</span>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-white rounded-full w-12 h-6 flex items-center justify-center mb-2">
              <span className="text-xl">0</span>
            </div>
            <div className="flex justify-center space-x-1">
              <span className="text-xl">1</span>
              <span className="text-xl">1</span>
              <span className="text-xl">1</span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Cada celda en la nueva fila se determina basándose en su estado actual y los estados de sus vecinos izquierdo y derecho.
          Las combinaciones que resultan en 1 están marcadas con círculos negros en el canvas.
        </p>
      </div>

      <div className="mb-4">
        <label htmlFor="iterations" className="block text-sm font-medium mb-1">
          Número de iteraciones:
        </label>
        <input
          type="number"
          id="iterations"
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
          min="1"
          max="1000"
          className="w-32 p-2 border rounded"
        />
      </div>
      <canvas id="rule30-canvas" className="border rounded mb-4"></canvas>
      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Columna Central:</h2>
        <p className="whitespace-pre-wrap">{centralColumn}</p>
      </div>
    </div>
  );
}

export default App;