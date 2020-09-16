import React, { Component } from "react"
import "./App.css"

class Cronometro extends Component {
    state = {
        timerLigado: false,
        timerInicio: 0,
        timerTempo: 0
    }

    iniciarTimer = () => {
        this.setState({
            timerLigado: true,
            timerInicio: Date.now() - this.state.timerTempo,
            timerTempo: this.state.timerTempo
        })

        this.timer = setInterval(() => {
            this.setState({
                timerTempo: Date.now() - this.state.timerInicio
            })
        }, 10)
    }

    pararTimer = () => {
        this.setState({ timerLigado: false })
        clearInterval(this.timer)
    }

    resetTimer = () => {
        this.setState({
            timerInicio: 0,
            timerTempo: 0
        })
    }

    render() {
        const { timerTempo } = this.state;
        let centissegundos = ("0" + (Math.floor(timerTempo / 10) % 100)).slice(-2)
        let segundos = ("0" + (Math.floor(timerTempo / 1000) % 60)).slice(-2)
        let minutos = ("0" + (Math.floor(timerTempo / 60000) % 60)).slice(-2)
        let horas = ("0" + Math.floor(timerTempo / 3600000)).slice(-2)

        return (
            <div className="Cronometro">
                <div className="Cronometro-header">Cronômetro</div>
                <div className="Cronometro-display">
                    <span>{horas}:</span>
                    <span>{minutos}:</span>
                    <span>{segundos}:</span>
                    <span>{centissegundos}</span>
                </div>

                {this.state.timerLigado === false && this.state.timerTempo === 0 && (
                    <button onClick={this.iniciarTimer}>Iniciar</button>
                )}
                {this.state.timerLigado === true && (
                    <button onClick={this.pararTimer}>Pausar</button>
                )}
                {this.state.timerLigado === false && this.state.timerTempo > 0 && (
                    <button onClick={this.iniciarTimer}>Continuar</button>
                )}
                {this.state.timerLigado === false && this.state.timerTempo > 0 && (
                    <button onClick={this.resetTimer}>Resetar</button>
                )}

                <h5>Philippe Carvalho</h5>

            </div>
        )
    }
}

export default Cronometro