from flask import Flask, render_template
from requests import get
from os import getenv

# Funções Python
def getClientes():
    res = get('https://hubbixgourmet-default-rtdb.firebaseio.com/Lojas.json') 
    return res.json()

def getPacotes():
    res = get('https://hubbixgourmet-default-rtdb.firebaseio.com/Pacotes.json') 
    return res.json()

def getDadosEmpresa(idEmp):
    res = get(f'https://hubbixgourmet-default-rtdb.firebaseio.com/Lojas/{idEmp}/.json') 
    return res.json()

def resultadosEmpresa(idEmp):
    dd = get(f'https://hubbixgourmet-default-rtdb.firebaseio.com/Lojas/{idEmp}/db/.json').json()
    resultado = {}
    vendas = dd['vendas']
    totalVendas = 0
    contagemVendas = 0
    
    for item in vendas:
        if item:
            totalVendas += float(item[2])
            contagemVendas += 1

    resultado['totalVendas'] = f'{totalVendas:.2f}'
    resultado['contagemVendas'] = contagemVendas

    return resultado


# Funções do Flask / Rotas
app = Flask(__name__)

@app.route('/')
@app.route('/login/')
def home():
    return render_template('login.html')

@app.route('/acesso/<idEmp>')
def register(idEmp):
    dados = getDadosEmpresa(idEmp)
    resultados = resultadosEmpresa(idEmp)
    return render_template('empresa.html', dados=dados, resultados=resultados)

@app.route('/clientes/idUser=<idUser>')
def clientes(idUser):
    # Valores dos Pacotes
    pc = getPacotes()
    anual = 0
    mensal = 0
    vitalicio = 0
    for i in pc:
        p = pc[i]
        if i.lower() == 'anual': anual = int(p)
        if i.lower() == 'mensal': mensal = int(p)
        if i.lower() == 'vitalicio': vitalicio = int(p)

    # Metricas
    res = getClientes()
    ativos = 0
    inativos = 0
    total = 0
    faturamento = 0
    for i in res:
        st = res[i]['Situação']
        if st == 'Ativa':
            ativos += 1
        elif st == 'Inativa':
            inativos += 1
        total += 1
        p = res[i]['Pacote da Loja']
        if p == 'Vitalicio': faturamento += vitalicio
        if p == 'Mensal': faturamento += (mensal*12)
        if p == 'Anual': faturamento += anual

    return render_template('clientes.html', cli=res, totalAtivos=ativos, totalInativos=inativos, total=total, vitalicio=vitalicio, mensal=mensal, anual=anual, faturamento=faturamento, idUser=idUser)

if __name__ == '__main__':
    port = int(getenv('PORT', '3600')) # Config para o Heroku
    debug = True # Preguiça de trocar o param na função kk
    app.run(debug=debug, host='0.0.0.0', port=port)