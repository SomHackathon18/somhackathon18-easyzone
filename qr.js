var base64ToImage = require('base64-to-image');
var base64Str = "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
var path = './matricules';
var optionalObj = {'fileName': 'matricula', 'type':'png'};
base64ToImage(base64Str,path,optionalObj);
var imageInfo = base64ToImage(base64Str,path,optionalObj);
