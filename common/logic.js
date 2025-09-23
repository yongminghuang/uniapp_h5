export const iconDataHandle = (value,pathName,rootPathName,val) => {
	var that = val
	var items = value.split("\n")
	var signs = []
	for (var i = 0; i < items.length; i++) {
		var item = items[i]
		var datas = item.split("|")
		if (datas.length == 5) {
			var imgList = datas[4].split(",")
			var images = [];
			for (var j = 0; j < imgList.length; j++) {
				if (j < 4) {
					var imgString = imgList[j]
					var imgUrl = imageDataHandle(datas[1],imgString,pathName == rootPathName,val)
					images.push(imgUrl) 
				}
				if (j == imgList.length - 1) {
					var signGroup = {
						id : datas[0],
						pathName : datas[1],
						title : datas[2],
						count : parseInt(datas[3]),
						images : images,
						type : 'group'
					}
					signs.push(signGroup)
					if (i == items.length - 1) {
						return signs
					}
				}
			}
		}else {
			var image = imageDataHandle(pathName,datas[2],pathName == rootPathName,val)
			var signItem = {
				id : datas[0],
				title : datas[1],
				image : image,
				content : datas[3],
				type : 'item'
			}
			signs.push(signItem)
			if (i == items.length - 1) {
				return signs
			}
		}
	}
}
			
export const imageDataHandle = (pathName,imageName,isRoot,val) => {
	var that = val
	if (isRoot) {
		var imgUrlStr = that.$util.imgDomainUrl() + '/lrjk/signs/cover/' + imageName + ".jpg"
		return imgUrlStr
	}else {
		var pathUrl = pathName.replace(/_/g, "/");
		var imgUrlStr = that.$util.imgDomainUrl() + '/lrjk/' + pathUrl + '/' + imageName + ".jpg" 
		return imgUrlStr
	}
}

export const settingAnswer = (sum) => {
	var answer = ""
	switch (sum){
		case 1:
			answer = "A"
			break
		case 2:
			answer = "B"
			break
		case 3:
			answer = "AB"
			break
		case 4:
			answer = "C"
			break
		case 5:
			answer = "AC"
			break
		case 6:
			answer = "BC"
			break
		case 7:
			answer = "ABC"
			break
		case 8:
			answer = "D"
			break
		case 9:
			answer = "AD"
			break
		case 10:
			answer = "BD"
			break
		case 11:
			answer = "ABD"
			break
		case 12:
			answer = "CD"
			break
		case 13:
			answer = "ACD"
			break
		case 14:
			answer = "BCD"
			break
		case 15:
			answer = "ABCD"
			break
		default:
			answer = ""
			break;
	}
	return answer
}