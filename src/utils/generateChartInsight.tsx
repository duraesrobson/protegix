import type { ReactNode } from "react"
import styles from "./ChartInsight.module.scss"

interface ChartItem {
  label: string
  value: number
}

interface GenerateChartInsightParams {
  perguntaId: string
  titulo: string
  data: ChartItem[]
  total: number
}

function getPercent(value: number, total: number) {
  if (!total) return 0
  return Math.round((value / total) * 100)
}

function getSortedData(data: ChartItem[]) {
  return [...data].sort((a, b) => b.value - a.value)
}

function Label({ children }: { children: ReactNode }) {
  return <span className={styles.highlightLabel}>{children}</span>
}

function Percent({ children }: { children: ReactNode }) {
  return <span className={styles.highlightPercent}>{children}</span>
}

function QuotedLabel({ children }: { children: ReactNode }) {
  return (
    <>
      "<Label>{children}</Label>"
    </>
  )
}

export function generateChartInsight({
  perguntaId,
  data,
  total
}: GenerateChartInsightParams): ReactNode {
  if (!data.length || total === 0) {
    return "Ainda não há respostas suficientes para gerar uma análise deste resultado."
  }

  const sorted = getSortedData(data)
  const first = sorted[0]
  const second = sorted[1]

  const firstPercent = getPercent(first.value, total)
  const secondPercent = second ? getPercent(second.value, total) : 0

  switch (perguntaId) {
    // =========================
    // HÁBITOS E ACESSO
    // =========================
    case "verifica_sites":
      if (first.label === "Sempre") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram que{" "}
            <Label>sempre</Label> verificam a segurança de sites antes de
            informar dados pessoais. Esse resultado mostra um comportamento mais
            cuidadoso e uma preocupação maior com proteção durante a navegação.
          </>
        )
      }

      if (first.label === "Às vezes") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes disseram que
            verificam a segurança de sites apenas <Label>às vezes</Label>. Isso
            sugere que existe alguma preocupação com proteção digital, mas esse
            cuidado ainda não acontece de forma totalmente consistente.
          </>
        )
      }

      if (first.label === "Nunca") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
            <QuotedLabel>Nunca</QuotedLabel>, o que acende um alerta importante.
            Isso mostra que parte dos participantes ainda navega sem adotar uma
            checagem básica de segurança antes de informar dados pessoais.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> dos participantes ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, indicando como esse cuidado
          com a segurança de sites aparece no comportamento digital do grupo.
        </>
      )

    case "falta_de_acesso":
      if (first.label === "Sim" || first.label === "Foi impactado") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes relataram já
            ter deixado de realizar alguma atividade por falta de acesso à
            tecnologia. Isso mostra que a exclusão digital ainda impacta a
            rotina de parte do público.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> dos participantes indicaram que não
          passaram por esse tipo de limitação. O resultado sugere que, para a
          maioria, o acesso à tecnologia já está relativamente presente no dia a
          dia.
        </>
      )

    case "qualidade_internet":
      return (
        <>
          <Label>{first.label}</Label> foi a avaliação mais recorrente da
          qualidade da internet, concentrando{" "}
          <Percent>{firstPercent}%</Percent> das respostas. Esse dado ajuda a
          entender como a infraestrutura de conexão influencia a experiência
          digital dos participantes.
        </>
      )

    case "disp_principal":
      return (
        <>
          <Label>{first.label}</Label> apareceu como principal meio de acesso à
          internet para <Percent>{firstPercent}%</Percent> dos participantes.
          Isso reforça qual dispositivo ocupa o papel mais central na rotina
          digital do grupo.
        </>
      )

    case "disp_atualizacao":
      return (
        <>
          <Label>{first.label}</Label> foi a resposta mais frequente sobre
          atualização de dispositivos, com <Percent>{firstPercent}%</Percent>{" "}
          das respostas. Isso dá um bom indicativo de como os participantes
          lidam com manutenção e segurança dos próprios aparelhos.
        </>
      )

    // =========================
    // SEGURANÇA DIGITAL
    // =========================
    case "senhas_diferentes":
      if (first.label === "Sempre") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram usar
            senhas diferentes para serviços importantes. Esse resultado aponta
            para uma prática positiva de segurança, já que reduz o risco de
            comprometimento em cadeia das contas.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>. Isso mostra que o uso de
          senhas diferentes ainda não é um hábito totalmente consolidado entre
          todos os participantes.
        </>
      )

    case "2fa":
      if (first.label === "Sempre") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes disseram
            utilizar autenticação em dois fatores. O resultado indica uma adoção
            relevante de uma camada extra de proteção para contas e serviços
            digitais.
          </>
        )
      }

      if (first.label === "Não sei o que é") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
            <QuotedLabel>Não sei o que é</QuotedLabel>, o que revela uma lacuna
            importante de conhecimento sobre um recurso básico e muito útil de
            segurança digital.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas se concentraram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, mostrando como a
          autenticação em dois fatores ainda é utilizada de forma desigual entre
          os participantes.
        </>
      )

    case "golpe":
      if (first.label === "Sim") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram já
            ter caído em algum golpe digital. Esse dado chama atenção para a
            presença real desse tipo de risco no cotidiano e reforça a
            importância de prevenção e conscientização.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, sugerindo que a maioria dos
          participantes não passou diretamente por esse tipo de situação, embora
          o tema continue sendo relevante.
        </>
      )

    // =========================
    // PERCEPÇÃO DE SEGURANÇA
    // =========================
    case "seg_navegacao":
    case "seg_bancos":
    case "seg_redes":
    case "seg_compras":
    case "seg_email":
      return (
        <>
          <Label>{first.label}</Label> foi a percepção mais comum entre os
          participantes, reunindo <Percent>{firstPercent}%</Percent> das
          respostas. Isso mostra como esse serviço digital é percebido em termos
          de segurança no uso cotidiano.
        </>
      )

    // =========================
    // IA
    // =========================
    case "utiliza_ia":
      if (
        first.label === "Sim" ||
        first.label === "Utiliza" ||
        first.label === "Usa"
      ) {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes disseram
            utilizar ferramentas de IA generativa. Isso mostra que esse tipo de
            tecnologia já está bastante presente na rotina digital do público
            pesquisado.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, indicando que o uso de IA
          ainda não é uma prática disseminada entre todos os participantes.
        </>
      )

    case "frequencia_ia":
      if (first.label === "Diariamente") {
        return (
          <>
            <QuotedLabel>{first.label}</QuotedLabel> foi a frequência mais
            recorrente, com <Percent>{firstPercent}%</Percent> das respostas.
            Isso mostra que, para parte dos participantes, o uso de IA já se
            integrou de forma forte à rotina.
          </>
        )
      }

      if (first.label === "Raramente") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram usar
            IA <Label>raramente</Label>. O resultado sugere que, embora a
            tecnologia esteja presente, ela ainda aparece mais como apoio
            ocasional do que como ferramenta constante.
          </>
        )
      }

      if (first.label === "Semanalmente") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
            <QuotedLabel>{first.label}</QuotedLabel>, indicando um uso
            recorrente, mas não necessariamente diário, dessas ferramentas no
            cotidiano.
          </>
        )
      }

      return (
        <>
          <Label>{first.label}</Label> foi a opção mais escolhida,
          representando <Percent>{firstPercent}%</Percent> das respostas. Isso
          ajuda a entender a intensidade com que a IA aparece na rotina dos
          participantes.
        </>
      )

    case "finalidade_ia":
      return (
        <>
          <Label>{first.label}</Label> apareceu como a principal finalidade de
          uso da IA, reunindo <Percent>{firstPercent}%</Percent> das respostas.
          Esse dado mostra em que tipo de atividade essas ferramentas têm sido
          mais aproveitadas pelos participantes.
        </>
      )

    case "confianca_ia":
      if (first.label === "Parcialmente") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes disseram
            confiar apenas <Label>parcialmente</Label> nas respostas fornecidas
            pela IA. Esse resultado sugere uma relação de uso com certa
            utilidade percebida, mas ainda acompanhada de cautela.
          </>
        )
      }

      if (first.label === "Pouco") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
            <QuotedLabel>{first.label}</QuotedLabel>, mostrando que a confiança
            nas respostas de IA ainda é limitada para boa parte dos
            participantes.
          </>
        )
      }

      if (first.label === "Muito") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes demonstraram
            alta confiança nas respostas geradas por IA. Isso indica uma
            percepção mais positiva em relação à utilidade e confiabilidade
            dessas ferramentas.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas se concentraram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, revelando qual percepção de
          confiança em relação à IA é mais predominante entre os participantes.
        </>
      )

    case "verificacao_ia":
      if (first.label === "Sempre") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes disseram que{" "}
            <Label>sempre</Label> verificam as informações fornecidas pela IA.
            Isso mostra um uso mais crítico e cuidadoso dessas ferramentas, sem
            aceitar as respostas automaticamente.
          </>
        )
      }

      if (first.label === "Às vezes") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
            <QuotedLabel>{first.label}</QuotedLabel>. O resultado indica que
            existe alguma preocupação em checar as informações geradas pela IA,
            mas esse hábito ainda não acontece de forma constante.
          </>
        )
      }

      if (first.label === "Nunca") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram que{" "}
            <Label>nunca</Label> verificam as respostas fornecidas pela IA. Isso
            pode indicar um uso mais passivo da ferramenta e um risco maior de
            confiar em informações sem validação.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> dos participantes ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, mostrando como o hábito de
          verificar respostas da IA se distribui entre o grupo.
        </>
      )

    // =========================
    // LGPD E PRIVACIDADE
    // =========================
    case "lgpd":
      if (
        first.label === "Sim" ||
        first.label === "Conhece" ||
        first.label === "Já ouviu falar"
      ) {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram já
            ter ouvido falar da LGPD. Isso sugere que o tema já alcançou uma
            parcela relevante do público, mesmo que o nível de aprofundamento
            possa variar.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, indicando que ainda existe
          uma parcela do público com pouco contato com o tema da LGPD.
        </>
      )

    case "lgpd_nivel":
      if (first.label === "Baixo") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes avaliaram seu
            nível de conhecimento sobre proteção de dados como{" "}
            <Label>baixo</Label>. Esse resultado mostra que o tema ainda pode
            estar distante da compreensão prática de boa parte do público.
          </>
        )
      }

      if (first.label === "Médio") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas se concentraram em{" "}
            <QuotedLabel>{first.label}</QuotedLabel>, sugerindo que muitos
            participantes têm alguma familiaridade com proteção de dados, mas
            ainda sem grande aprofundamento.
          </>
        )
      }

      if (first.label === "Alto") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes classificaram
            seu conhecimento como <Label>alto</Label>. Isso aponta para um grupo
            que já demonstra maior consciência sobre privacidade e proteção de
            dados.
          </>
        )
      }

      return (
        <>
          <Label>{first.label}</Label> foi a avaliação mais frequente,
          representando <Percent>{firstPercent}%</Percent> das respostas. Isso
          ajuda a mostrar como os participantes percebem o próprio conhecimento
          sobre proteção de dados.
        </>
      )

    case "lgpd_termos":
      if (first.label === "Nunca") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes disseram que{" "}
            <Label>nunca</Label> leem termos de uso e políticas de privacidade.
            O resultado reforça como esse tipo de conteúdo ainda costuma ser
            ignorado na experiência digital cotidiana.
          </>
        )
      }

      if (first.label === "Às vezes") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
            <QuotedLabel>{first.label}</QuotedLabel>, mostrando que a leitura de
            termos de uso e políticas de privacidade acontece, mas ainda de
            forma pouco constante entre os participantes.
          </>
        )
      }

      if (first.label === "Sempre") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes afirmaram ler{" "}
            <Label>sempre</Label> esse tipo de conteúdo. Embora não represente
            necessariamente a maioria, o resultado mostra a presença de um grupo
            com postura mais atenta em relação à privacidade.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas se concentraram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, indicando como os
          participantes se posicionam diante da leitura de termos e políticas de
          privacidade.
        </>
      )

    case "lgpd_uso":
      if (
        first.label === "Sim" ||
        first.label === "Já evitou serviços" ||
        first.label === "Evitou serviços"
      ) {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes relataram já
            ter deixado de usar algum serviço por preocupação com privacidade.
            Isso mostra que, para parte do público, a forma como os dados são
            tratados já influencia decisões reais de uso.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas ficaram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, sugerindo que a preocupação
          com privacidade ainda nem sempre chega ao ponto de mudar o
          comportamento de uso dos participantes.
        </>
      )

    case "lgpd_preocupacao":
      if (first.label === "Muito") {
        return (
          <>
            <Percent>{firstPercent}%</Percent> dos participantes demonstraram
            alto nível de preocupação com o uso dos próprios dados pessoais na
            internet. Esse resultado reforça que privacidade já é percebida como
            um tema sensível no ambiente digital.
          </>
        )
      }

      return (
        <>
          <Percent>{firstPercent}%</Percent> das respostas se concentraram em{" "}
          <QuotedLabel>{first.label}</QuotedLabel>, indicando como a preocupação
          com dados pessoais aparece entre os participantes.
        </>
      )

    // =========================
    // PERFIL
    // =========================
    case "faixa_etaria":
      return (
        <>
          <Label>{first.label}</Label> foi a faixa etária mais presente na
          pesquisa, representando <Percent>{firstPercent}%</Percent> das
          respostas. Isso ajuda a contextualizar o perfil predominante do
          público analisado.
        </>
      )

    case "escolaridade":
      return (
        <>
          <Label>{first.label}</Label> apareceu como o nível de escolaridade mais
          frequente, com <Percent>{firstPercent}%</Percent> das respostas. Esse
          dado ajuda a entender melhor o perfil dos participantes da pesquisa.
        </>
      )

    case "tempo_uso":
      return (
        <>
          <Label>{first.label}</Label> foi o tempo de conexão mais recorrente
          entre os participantes, reunindo <Percent>{firstPercent}%</Percent>{" "}
          das respostas. O resultado mostra a intensidade com que a internet já
          faz parte do cotidiano do grupo.
        </>
      )

    case "tipo_conexao":
      return (
        <>
          <Label>{first.label}</Label> foi a forma de conexão mais utilizada no
          dia a dia, com <Percent>{firstPercent}%</Percent> das respostas. Isso
          ajuda a identificar o padrão mais comum de acesso à internet entre os
          participantes.
        </>
      )

    default:
      if (second) {
        return (
          <>
            <Label>{first.label}</Label> apareceu com maior frequência,
            representando <Percent>{firstPercent}%</Percent> das respostas,
            enquanto <Label>{second.label}</Label> veio em seguida com{" "}
            <Percent>{secondPercent}%</Percent>. Esse resultado mostra a
            tendência mais evidente entre os participantes nessa questão.
          </>
        )
      }

      return (
        <>
          <Label>{first.label}</Label> foi a resposta mais recorrente,
          concentrando <Percent>{firstPercent}%</Percent> do total. Isso resume
          o comportamento predominante observado nessa pergunta.
        </>
      )
  }
}