export const symbolMap: Record<string, string> = {
  'AYA.TO': 'AYA.TO', '2B76.XETRA': '2B76.DE', 'XY7D.XETRA': 'XY7D.DE', 'JEPQ.LSE': 'JEPQ.L', 'LITU.LSE': 'LITU.L', 'EVSD.XETRA': 'EVSD.DE', 'JGPI.XETRA': 'JGPI.DE', 'SDIV.LSE': 'SDIV.L', '8PSG.XETRA': '8PSG.DE', 'STHE.LSE': 'STHE.L', QTRX: 'QTRX', 'AG.TO': 'AG.TO', 'SLVR.XETRA': 'SLVR.DE', SPCX: 'SPCX', 'GSVR.V': 'GSVR.V', '8PSB.XETRA': '8PSB.DE',
}
export const providerSymbol = (displaySymbol: string) => symbolMap[displaySymbol] ?? displaySymbol
