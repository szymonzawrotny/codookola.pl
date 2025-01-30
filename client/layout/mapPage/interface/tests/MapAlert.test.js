import { render, screen } from '@testing-library/react';
import React from 'react';
import MapAlert from '../MapAlert.js';
import '@testing-library/jest-dom';

describe('MapAlert', () => {
  
  test('Czy poprawnie wyświetla komunikat', () => {
    const alertMessage = 'Testowy komunikat';
    render(<MapAlert alert={alertMessage} mapAlertRef={React.createRef()} />);

    expect(screen.getByText(alertMessage)).toBeInTheDocument();
  });

  test('Czy poprawnie przypisuje ref do elementu', () => {
    const ref = React.createRef();
    render(<MapAlert alert="Komunikat z referencją" mapAlertRef={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current.textContent).toBe('Komunikat z referencją');
  });

  test('Czy element ma właściwą klasę', () => {
    const alertMessage = 'Sprawdz klasę komunikatu';
    render(<MapAlert alert={alertMessage} mapAlertRef={React.createRef()} />);

    const alertElement = screen.getByText(alertMessage);
    expect(alertElement).toHaveClass('MapAlert');
  });
});


