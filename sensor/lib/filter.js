var _               = require("underscore")

var filter = function(){

	this.filterHex = function(hex){
		//Substring 'AAAAAA' of 0xAAAAAAL
		var binary = ""
		binary= hexToBin(hex.substring(2,8))
		console.log(binary)
		getMajorClass(binary)
	}

	function hexToBin(hex){
		var res=""
		len= hex.length
		for (i=0;i<len;i++){
			hi = String(hex).charAt(i)
			switch (hi)
			{
			case '0':
				res +='0000'
				break;
			case '1':
				res +='0001'
				break;
			case '2':
				res +='0010'
				break;
			case '3':
				res +='0011'
				break;
			case '4':
				res +='0100'
				break;
			case '5':
				res +='0101'
				break;
			case '6':
				res +='0110'
				break;
			case '7':
				res +='0111'
				break;
			case '8':
				res +='1000'
				break;
			case '9':
				res +='1001'
				break;
			case 'a':
				res +='1010'
				break;
			case 'b':
				res +='1011'
				break;
			case 'c':
				res +='1100'
				break;
			case 'd':
				res +='1101'
				break;
			case 'e':
				res +='1110'
				break;
			case 'f':
				res +='1111'
				break;
			}
		}
		return res
	}
	function getMajorClass(binary){
		//based on https://www.bluetooth.org/en-us/specification/assigned-numbers/baseband
		bits=binary.substring(11,16)
		console.log(bits)
		major_class ="Undefinied"
		switch(bits){
			case '00000':
				major_class='Miscellaneous'
			break
			case '00001':
				major_class='Computer'
			break
			case '00010':
				major_class='Phone'
			break
			case '00011':
				major_class='LAN'
			break
			case '00100':
				major_class='Audio/Video'
			break
			case '00101':
				major_class='Peripheral'
			break
			case '00110':
				major_class='Imaging'
			break
			case '00111':
				major_class='Wearable'
			break
			case '01000':
				major_class='Toy'
			break
			case '01001':
				major_class='Health'
			break
			case '11111':
				major_class='Uncategorized'
			break
			default:
				major_class='Reserved'
			break
		}
		console.log(major_class)
	}
	function checkAccept(binary){

	}
}
filter1= new filter()
filter1.filterHex('0x3e010cL')

module.exports = filter

