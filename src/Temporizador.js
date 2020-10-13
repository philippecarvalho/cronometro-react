import React, { Component } from "react"
import "./App.css"

import { MdStop, MdPlayArrow, MdPause } from "react-icons/md";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Temporizador extends Component {
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

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    notify = () => toast.info('O tempo acabou', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    notificacaoRequest() {
        if (!("Notificação" in window)) {
            console.log("Esse navegador não tem suporte a notificações");
        } else {
            Notification.requestPermission();
        }
    }

    handleSubmit = () => {
        const timerSegundos = this.state.segundos * 1000
        const timerMinutos = this.state.minutos * 60000
        const timerHoras = this.state.horas * 3600000

        this.setState({
            countdown: true,
            timerInicio: timerSegundos + timerMinutos + timerHoras
        })

        this.iniciarTimer()
    }

    handleChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        });
    }

    iniciarTimer = () => {
        this.setState({
            timerLigado: true
        })

        this.temporizador = setInterval(() => {
            const timerInicio = this.state.timerInicio

            if (timerInicio > 0) {
                this.setState({
                    timerInicio: this.state.timerInicio - 1000
                })
            }
            if (timerInicio === 0) {
                clearInterval(this.temporizador)

                if (this.state.timerLigado) {
                    new Notification('O tempo acabou')
                    this.notify()
                }

                this.setState({
                    countdown: false,
                    timerInicio: 0,
                    timerLigado: false,
                    horas: 0,
                    minutos: 0,
                    segundos: 0
                })
            }
        }, 1000)

    }

    pararTimer = () => {
        this.setState({ timerLigado: false })
        clearInterval(this.temporizador)
    }

    resetTimer = () => {
        this.setState({
            timerInicio: 0,
            horas: 0,
            minutos: 0,
            segundos: 0,
            timerLigado: false,
            countdown: false
        })
    }

    maxLengthCheck = (object) => {
        if (object.target.value.length > object.target.maxLength) {
            object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    getCountdown = () => {
        let countdown = []

        const tempoTotal = this.state.timerInicio

        let segundos = ("0" + (Math.floor(tempoTotal / 1000) % 60)).slice(-2)
        let minutos = ("0" + (Math.floor(tempoTotal / 60000) % 60)).slice(-2)
        let horas = ("0" + Math.floor(tempoTotal / 3600000)).slice(-2)

        if (this.state.countdown) {
            countdown.push(
                <div className="Cronometro-display" >
                    <span>{horas}:</span>
                    <span>{minutos}:</span>
                    <span>{segundos}</span>
                </div>
            )
        }
        return countdown
    }

    getCountdownInput = () => {
        let countdownInput = []

        if (!this.state.countdown) {
            countdownInput.push(
                <div className="temporizadorInpuntWrapper" >
                    <ToastContainer
                        position="top-center"
                        autoClose={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                    />

                    <span>Preencha o tempo desejado</span><br /><br />

                    <input className="temporizadorInput"
                        maxLength="2"
                        onInput={this.maxLengthCheck}
                        type="number"
                        name="horas"
                        placeholder="00"
                        onChange={this.handleChange}
                    />

                    :

                <input className="temporizadorInput"
                        maxLength="2"
                        onInput={this.maxLengthCheck}
                        type="number"
                        name="minutos"
                        placeholder="00"
                        onChange={this.handleChange}
                    />

                    :

                <input className="temporizadorInput"
                        maxLength="2"
                        onInput={this.maxLengthCheck}
                        type="number"
                        name="segundos"
                        placeholder="00"
                        onChange={this.handleChange}
                    />
                </div >
            )
        }

        return countdownInput
    }

    render() {
        return (


            <div className="Cronometro">

                {this.getCountdownInput()}

                {this.getCountdown()}

                {this.state.timerLigado === false && this.state.timerInicio === 0 && (
                    <button onClick={this.handleSubmit}><MdPlayArrow /></button>
                )}

                {this.state.timerLigado === true && (
                    <button onClick={this.pararTimer}><MdPause /></button>
                )}

                {this.state.timerLigado === true && (
                    <button onClick={this.resetTimer}><MdStop /></button>
                )}

                {this.state.timerLigado === false && this.state.timerInicio > 0 && (
                    <button onClick={this.iniciarTimer}><MdPlayArrow /></button>
                )}
            </div>
        )
    }
}

export default Temporizador