import { useRouter } from "next/router"
import Botao from "../components/Botao"
import Estatistica from "../components/Estatistica"
import styles from "../styles/resultado.module.css"



export default function Resultado() {
    const router = useRouter()
    
    const total = +router.query.total
    const certas = +router.query.certas 
    const percentual =  Math.round((certas / total) * 100)

    const corPercentual = percentual >= 50 ? '#3aec3a' : '#f31818d5'

    return (
        <div className={styles.resultado}>
            <h1>Resultado Final</h1>
            <div style={{ display:"flex" }}>
                <Estatistica texto="perguntas" valor = {total}/>
                <Estatistica texto="certas" valor = {certas}
                    corFundo ="#9cd2a4"/>
                <Estatistica texto="percentual" valor = {`${percentual}%`}
                    corFundo={corPercentual}/>
            </div>
            <Botao href="/" texto="Tentar Novamente"/>
        </div>
    )
}