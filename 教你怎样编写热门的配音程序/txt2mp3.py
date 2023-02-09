## https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/get-started-text-to-speech?tabs=windowsinstall&pivots=programming-language-rest

## pip install requests
import requests

## azure语音服务密钥和区域
key = "这里填写您azure账号的key"
region = "eastasia"

url = "https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1"

## 语音合成标记语言 (SSML) 
## https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/speech-synthesis-markup?tabs=csharp
## 语言支持：https://docs.microsoft.com/zh-cn/azure/cognitive-services/speech-service/language-support?tabs=speechtotext#text-to-speech
ssml = """
<speak version='1.0' xml:lang='zh-CN'>
	<voice xml:lang='zh-CN' xml:gender='male' name='zh-CN-YunxiNeural'>
我们致力于兴趣编程，跟着我每天学习一点点，让你不在枯燥，不在孤单。终身学习，一直追求，享受过程，期待未来……
	</voice>
</speak>""".encode("utf-8")

headers = {
	"Ocp-Apim-Subscription-Key": key,
	"Content-Type": "application/ssml+xml",
	"X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3"
}
res = requests.post(url, data = ssml, headers = headers)

with open("output.mp3", "wb") as data:
	data.write(res.content)
input("输出mp3文件成功")