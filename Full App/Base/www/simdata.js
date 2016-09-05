	tmpR = {
    "status": 200,
    "rules": [{
        "idRule": "Jd6NoTij3xTDF9WurjcOKt37hkwf2auTinKnsrhUHtulfv+hnAFH43BxYo+0nrynehvBCvWiFGDf3U0GytB407Ovb+G9RhZTByorVsaPWPI15wqpbijpnRVHgY0pIVl1rjZYPkvU+p9EXW+h7rx+/h3D04SR6nypfeehG4xFgKaGXgUENj6wCKvON980CQ4o",
        "ruleName": "Monto Individual",
        "description": "Notificarme cuando realice una transacción por un monto superior a $<[singleAmount]>.",
        "singleAmount": 75
    }, {
        "idRule": "z52I/ayONskbgvh887bNWId74MDgWVEIrLwdh0L8pXZF6EecIJQEpcg1W2ON6j6ktXiz+peZE9WnT9AzSKjJEPe9AGaRQqybu0qDjA8GZnyoN9uylYrk3d98pys9XwPia3pMqKdNcA2kT93zURMigcvJICqXYOhpBDo25CKSlD5z1kgNDaer9V0jpxmx40XS",
        "ruleName": "Cantidad de Transacciones",
        "description": "Notificarme cuando realice más de <[trxNo]> transacciones",
        "trxNo": 2,
        "idTime": 5
    }, {
        "idRule": "Sr03X6U3hzXPM6HcYatRUK9XNDV75jF4mrEd2BCAs6M3NfPZRCqelacrB9HTAehbABIw+mRea4LEr2TReuU/Ql/WofVxh43D/nTOhjxarXcQwe07lrtdpGTMN1d/P8+hW7ceaVzuZEVWiO2vzavLWne0DGmXZJKPrcwHfgPQsbVHHJhb6khbByLlMbkXxDLf",
        "ruleName": "Monto Acumulado",
        "description": "Notificarme cuando el monto acumulado de transacciones supere los $<[totalAmount]> en los últimos <[idTime]>.",
        "totalAmount": 150,
        "idTime": 5
    }, {
        "idRule": "g6h265UCmP66bGsZe6DD9pxLs/G/WEx9y7YjiIrNWmiVb4gNXL17BnDLecAhYNbFxli9CEUSs0nAW9UWweVV1SR9r8i+LdJsF6XsD78CJ1nS8A5f2nH00gejahu+JwELMESIopYnA71JHySLU8nS7Qqtz1QHbz36/amnqeor5I8iKyJ05x86fh949wJK/W3n",
        "ruleName": "Catidad y Monto de Transacciones",
        "description": "Notificarme cuando realice más de <[trxNo]> transacciones cuyo monto supere los $<[totalAmount]> en los últimos <[idTime]>.",
        "totalAmount": 300,
		"Active": true,
        "trxNo": 3,
        "idTime": 5
    }, {
        "idRule": "6NhhqizDD4TkwCX7OwlVNt74zWuWaC9yOUcX1JN6mZ2a06sTJ6VKm9YofjlMJpZ+boUyYEz1dXK6p1p9HMGS3bJcgMrEw6ePBEp0mwYJkaKUFedC6z0a/SGSuIERDNPVRolKFgpeVpPw7UCkhqGXKso/MF8hZVsOoH3n7BfiC81qNhYvL2O0uGfCQ+w4gVzf",
        "ruleName": "Diferencia porcentual",
        "description": "Notificarme la tasa de interés de la tarjeta presente una variación de un <[varation]> %.",
        "varation": 10
		
    }, {
        "idRule": "rDXM9yJ6hxodcCQQvlwzBlWyrGY/Q682qIBppYyZRpILYS9OQ95yxQ9pMMuqoeZTpQbTMsHm5yYUXW21Ryl5I0G/VL5VdUjPK91xj7MFeBaZJ4mIJFPrh6g3YF2w5HmU5nO9feIOci95vz/fUuTXZxKnnYm2I4z4gc8I9O/9I63D1bsCUEfeceSpeVR2b23L",
        "ruleName": "MTindividiual",
        "description": "252 <[idTime]>",
        "trxNo": 25,
        "idTime": 6
    }]
};

tmpT = {
    "status": 200,
    "periods": [{
        "idTime": 1,
        "amount": 30,
        "unit": "Minute(s)"
    }, {
        "idTime": 2,
        "amount": 1,
        "unit": "Hour(s)"
    }, {
        "idTime": 3,
        "amount": 6,
        "unit": "Hour(s)"
    }, {
        "idTime": 4,
        "amount": 12,
        "unit": "Hour(s)"
    }, {
        "idTime": 5,
        "amount": 1,
        "unit": "Day(s)"
    }, {
        "idTime": 6,
        "amount": 10,
        "unit": "Minute(s)"
    }]
};

products = {
    "status": 200,
    "products": {
        "kilomanyaroB": "TarjetaCredito",
        "sanduBoxB": "soundGood"
    }
}
	SPickerString = timePicker(tmpT["periods"]);
	addRules(tmpR["rules"]);