import { useState, useEffect } from 'react';

import CopyPasswordButton from '../CopyPasswordButton';
import PasswordBox from '../PasswordBox';

import './styles.css';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [digitsLength, setDigitsLength] = useState(2);
  const [symbolsLength, setSymbolsLength] = useState(2);

  useEffect(() => {
    const draftPassword = [];

    draftPassword.push(...Array.from({ length: digitsLength }, randomDigit));
    draftPassword.push(...Array.from({ length: symbolsLength }, randomSymbol));
    draftPassword.push(...Array.from({ length: passwordLength }, randomLetter));

    draftPassword.push(randomSymbol());
    draftPassword.push(randomLetter());

    setPassword(
      draftPassword
        .slice(0, passwordLength)
        .sort(() => Math.random() - 0.5)
        .join('')
    );
  }, [passwordLength, digitsLength, symbolsLength]);

  const randomDigit = () => {
    const digits = '123456789';
    return digits[Math.floor(Math.random() * digits.length)];
  };

  const randomSymbol = () => {
    const symbols = '!@#$&';
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const randomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const letter = letters[Math.floor(Math.random() * letters.length)];
    return Math.random() >= 0.5 ? letter : letter.toUpperCase();
  };

  return (
    <>
      <div className="slider">
        <label htmlFor="">Tamanho</label>
        <input
          id="password-length"
          type="range"
          min={4}
          max={64}
          value={passwordLength}
          onChange={({ target }) => setPasswordLength(parseInt(target.value))}
        />
        <span>{passwordLength}</span>
      </div>
      <div className="slider">
        <label htmlFor="">Dígitos</label>
        <input
          id="digits-length"
          type="range"
          min={0}
          max={10}
          value={digitsLength}
          onChange={({ target }) => setDigitsLength(parseInt(target.value))}
        />
        <span>{digitsLength}</span>
      </div>
      <div className="slider">
        <label htmlFor="">Símbolos</label>
        <input
          id="symbols-length"
          type="range"
          min={0}
          max={10}
          value={symbolsLength}
          onChange={({ target }) => setSymbolsLength(parseInt(target.value))}
        />
        <span>{symbolsLength}</span>
      </div>
      <PasswordBox password={password} />
      <CopyPasswordButton password={password} />
    </>
  );
};
export default PasswordGenerator;
