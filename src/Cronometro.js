import React, { Component } from "react"
import "./App.css"

import { MdStop, MdPlayArrow, MdPause, MdFlag } from "react-icons/md"

class Cronometro extends Component {
    state = {
        timerLigado: false,
        timerInicio: 0,
        timerTempo: 0,
        parcialCount: 0,
        parcialValue: []
    }

    handleClick = () => {
        this.setState({ parcialCount: this.state.parcialCount + 1 })
        this.setState({ parcialValue: this.state.parcialValue.concat(this.state.timerTempo) })
    }

    getParcial = () => {
        let parcial = [];

        for (let i = 0; i < this.state.parcialCount; i++) {
            const valores = this.getTempo(this.state.parcialValue[i])

            let valoresDiferenca = this.getTempo(this.state.parcialValue[i])

            if (i !== 0)
                valoresDiferenca = this.getTempo(this.state.parcialValue[i] - this.state.parcialValue[i - 1])

            parcial.push(
                <div className="parcialContainer">
                    <ul>
                        <li className="parcialContador">
                            <span>{i + 1}</span>
                        </li>

                        <li className="parcialAnterior">
                            +<span>{valoresDiferenca.horas}:</span>
                            <span>{valoresDiferenca.minutos}:</span>
                            <span>{valoresDiferenca.segundos}:</span>
                            <span>{valoresDiferenca.centesimos}</span>
                        </li>

                        <li className="parcialAtual">
                            <span>{valores.horas}:</span>
                            <span>{valores.minutos}:</span>
                            <span>{valores.segundos}:</span>
                            <span>{valores.centesimos}</span>
                        </li>
                    </ul>
                </div>
            )
        }
        return parcial;
    }

    getTempo = (tempoTotal) => {
        let centesimos = ("0" + (Math.floor(tempoTotal / 10) % 100)).slice(-2)
        let segundos = ("0" + (Math.floor(tempoTotal / 1000) % 60)).slice(-2)
        let minutos = ("0" + (Math.floor(tempoTotal / 60000) % 60)).slice(-2)
        let horas = ("0" + Math.floor(tempoTotal / 3600000)).slice(-2)

        return ({ centesimos, segundos, minutos, horas })
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
            timerTempo: 0,
            parcialCount: 0,
            parcialValue: []
        })
    }

    render() {

        const { timerTempo } = this.state;
        let valores = this.getTempo(timerTempo)

        return (
            <div className="Cronometro">
                <div className="Cronometro-display">
                    <span>{valores.horas}:</span>
                    <span>{valores.minutos}:</span>
                    <span>{valores.segundos}:</span>
                    <span>{valores.centesimos}</span>
                </div>


                {this.state.timerLigado === false && this.state.timerTempo === 0 && (
                    <button onClick={this.iniciarTimer}><MdPlayArrow /></button>
                )}
                {this.state.timerLigado === true && (
                    <button onClick={this.handleClick}><MdFlag /></button>
                )}
                {this.state.timerLigado === true && (
                    <button onClick={this.pararTimer}><MdPause /></button>
                )}

                {this.state.timerLigado === false && this.state.timerTempo > 0 && (
                    <button onClick={this.iniciarTimer}><MdPlayArrow /></button>
                )}
                {this.state.timerLigado === false && this.state.timerTempo > 0 && (
                    <button onClick={this.resetTimer}><MdStop /></button>
                )}

                <div>
                    {this.getParcial()}
                </div>

            </div>
        )
    }
}

export default Cronometro