import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'



const BASE_URL = 'http://localhost:3000/api'


export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes , setIdsDasQuestoes] = useState<number[]>([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState<number>(0)

  
  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }

  async function carregarQuestao(id:number){
    const resp = await fetch(`${BASE_URL}/questoes/${id}`)
    const json = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(json)
    setQuestao(novaQuestao)
  }
  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])

  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestao(idsDasQuestoes[0])
  }, [idsDasQuestoes])

  function questaoRespondida(questaoRespondida:QuestaoModel){
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }
  
  function idProximaPergunta(){
    const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1
    return idsDasQuestoes[proximoIndice]
  }


  function irParaProximo(){
    const proximoId = idProximaPergunta()
    proximoId ? irParaProximaQuestao(proximoId) : finalizar()
  }

  function irParaProximaQuestao(proximoId:number){
    carregarQuestao(proximoId)
  }

  function finalizar(){

    router.push({
      pathname: '/resultado',
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }
  return questao ? (
    <Questionario
      questao={questao}
      ultimaQuestao={idProximaPergunta() === undefined}
      questaoRespondida={questaoRespondida}
      irParaProximo={irParaProximo}
    />
  ) : false
}
