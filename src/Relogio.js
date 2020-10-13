import React, { Component } from "react"
import "./App.css"

import Clock from 'react-live-clock';

class Relogio extends Component {
    constructor() {
        super();

        this.state = {
            countdown: false,
            timerLigado: false,
            timerInicio: 0,
            time: 0,

            segundos: "00",
            minutos: "00",
            horas: "00",
        };
    }

    render() {
        const dataAtual = new Date()

        return (
            <div className="Cronometro">
                <div class="hora-principal">
                    <Clock format={'HH:mm:ss'} ticking={true} timezone={'America/Sao_Paulo'} />
                </div>
                <div className="data-atual">
                    {dataAtual.getDate() + '/' + (dataAtual.getMonth() + 1) + '/' + dataAtual.getFullYear()}
                </div>



                <div className="timezones">
                    <ul>
                        <li>
                            <span>Tokyo:</span> <Clock format={'HH:mm'} ticking={true} timezone={'Asia/Tokyo'} />
                        </li>
                        <li>
                            <span>Paris:</span> <Clock format={'HH:mm'} ticking={true} timezone={'Europe/Paris'} />
                        </li>
                        <li>
                            <span>Nova Iorque:</span> <Clock format={'HH:mm'} ticking={true} timezone={'America/New_York'} />
                        </li>
                        <li>
                            <span>Pequim:</span> <Clock format={'HH:mm'} ticking={true} timezone={'Asia/Shanghai'} />
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}

export default Relogio