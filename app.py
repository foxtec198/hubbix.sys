from flask import Flask, render_template
from requests import get
from os import getenv

app = Flask(__name__)

def getClientes():
    res = get('https://hubbixgourmet-default-rtdb.firebaseio.com/Lojas.json') 
    return res.json()

def getPacotes():
    res = get('https://hubbixgourmet-default-rtdb.firebaseio.com/Pacotes.json') 
    return res.json()

@app.route('/login')
def homeLogin():
    return render_template('index.html')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/clientes')
def clientes():
    pc = getPacotes()
    anual = 0
    mensal = 0
    vitalicio = 0
    for i in pc:
        p = pc[i]
        if i.lower() == 'anual': anual = int(p)
        if i.lower() == 'mensal': mensal = int(p)
        if i.lower() == 'vitalicio': vitalicio = int(p)

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
    return render_template('clientes.html', cli=res, totalAtivos=ativos, totalInativos=inativos, total=total, vitalicio=vitalicio, mensal=mensal, anual=anual, faturamento=faturamento)

if __name__ == '__main__':
    port = int(getenv('PORT', '3600'))
    app.run(host='0.0.0.0', port=port)