//require('dotenv').config()

const express = require('express')
const router = express.Router()

router.get('/:num', (req, res) => {
    let result = doPlusOne(req.params.num)
    if(result.status === '200'){
        res.status(result.status).json({'new_number': result.number.toString(), 'old_number': req.params.num.toString()})
    }else{
        res.status(result.status).json({'error_msg': result.msg})
    }

})

const doPlusOne = (number) => {
    try {
        if (typeof number !== 'string') number = number.toString()
    }catch (e) {
        console.log(e)
        return {'status': '469', 'msg': 'Error! Not a number'}
    }

    if (number.charAt(0) === '-'){
        if (number.charAt(1) === '0'){
            return {'status': '200', 'number': '1'}
        }

        number = number.substring(1)
        if (!stringIsNumber(number)) return {'status': '420', 'msg': 'Error! Only accepts integers'}

        let result = negativeRecursion(number, number.length-1)
        return {'status': '200', 'number': result}
    }else {
        if (number.charAt(0) === '0'){
            return {'status': '200', 'number': '1'}
        }
        if (!stringIsNumber(number)) return {'status': '420', 'msg': 'Error! Only accepts integers'}

        let result = positiveRecursion(number, number.length-1)
        return {'status': '200', 'number': result}

    }
}

const negativeRecursion = (number, position) => {
    if (number.charAt(position) === '0'){
        let n = number.split('')
        n[position] = '9'
        if (position === 1 && number.charAt(0) === '1'){
            n[0] = '-'
            return n.join('')
        }
        return negativeRecursion(n.join(''), --position)
    }else{
        let n = number.split('')
        let newNum = parseInt(n[position])
        n[position] = (--newNum).toString()
        return '-' + n.join('')
    }
}

const positiveRecursion = (number, position) => {
    if (number.charAt(position) === '9'){
        let n = number.split('')
        n[position] = '0'
        if (position === 0){
            return '1' + n.join('')
        }
        return positiveRecursion(n.join(''), --position)
    }else{
        let n = number.split('')
        let newNum = parseInt(n[position])
        n[position] = (++newNum).toString()
        return n.join('')
    }
}

const stringIsNumber = (num) => {
    const acceptedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    for (let i = 0; i < num.length; i++){
        if(!acceptedCharacters.includes(num.charAt(i))) return false
    }
    return true
}



module.exports = router