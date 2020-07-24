# Material Curso de OpenCV em Python
<p align="center">
  <img src="https://res.cloudinary.com/ieee-uem/image/upload/w_400/v1594923713/site-ieee-uem/Curso_-_OpenCV_jlu5ry.png" alt="logo openCV">
</p>

#### Oferecimento: Student Branch IEEE UEM - <https://www.ieeeuem.com.br>

#### Ministrantes:
- **Leonichel Guimarães - leonichelg@gmail.com**
- **Rodolfo Lemes Saraiva - rodolfo_fero@hotmail.com**
- **Leonardo Armelin - leonardoarmelin@ieee.org**

###### Maringá, 20 de Julho de 2020

-------------
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Importações
A primeira coisa para iniciar nos códigos são as importações das bibliotecas que utilizaremos, sendo elas:

- [OpenCV-Python](https://opencv-python-tutroals.readthedocs.io/en/latest/index.html)
- [NumPy](https://numpy.org/)
- [Matplotlib](https://matplotlib.org/)

Neste curso iremos usar algumas imagens, a grande maioria dessas imagens podem ser baixadas no repositório do projeto [*OpenCV*](https://github.com/opencv/opencv) do *GitHub*. Baixem o repositório. As imagens e vídeos estão na pasta *samples/data*.

Em código:

``` python
import cv2
import numpy as np
import matplotlib.pyplot as plt
```

## Comandos básicos
Podemos ler imagens e plotar as imagens pelo próprio *OpenCV*

```python
img = cv2.imread('lena.jpg', param)
# param: 0 abre a imagem em escala de cinza
#        1 abre a imagem em color, se a referência for colorida

cv2.imshow("Nome da tela", img)
# Desenha uma tela com a imagem respectiva

cv2.waitKey(0)
cv2.destroyAllWindows()
# Simples comandos para esperar para retirar a tela, é necessário
# Qualquer botão pode parar o programa
```

Lembrando que a variável *img* pode ser descrito como um elemento da biblioteca *NumPy*, ou seja, podemos utilizar as ferramentas fantásticas que essa biblioteca nos oferece para manipular essas matrizes.

Porém, para facilitar o plot dos gráficos, iremos utilizar uma função criada para isso:
```python
def Plote(img):
  plt.axis('off')
  plt.imshow(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
  plt.show()
```
Esta função realiza o plot pela função *matplotlib*, por isso é necessário converter a imagem de BGR para RGB. Esta função simplifica o processo.

## Transformação de cores
A biblioteca nos fornece inúmeros métodos para transformar nossas imagens em determinadas cores ou escaladas, como para Cinza, RGB ou HSV.

A função que faz todas as mudanças é a cvtColor.
```python
resultado = cv2.cvtColor(img, param)
#param: cv2.COLOR_BGR2GRAY, transforma para escala cinza
#       cv2.COLOR_BGR2HSV, transforma para a escala HSV
#       cv2.COLOR_BGR2RGB, transforma para RGB
```
Existem inúmeras transformações, porém, para este curso iremos utilizar apenas essas. Lembrando que a biblioteca *openCV* lê a imagem na escala BGR.

## Threshold
Esse processo é usado para criar uma imagem binarizada, preto e branco, utilizando de parâmetros externos, colocados pelo usuário. Existem vários tipos de *threshold*, iremos focar apenas em um, no mais simples. 
O processo faz com que pixels acima de determinado nível vire branco e abaixo desse nível fique preto.

```python
retval, threshold = cv2.threshold(img, nivel, 255, cv2.THRESH_BINARY)
```
Na saída da função obtemos duas variáveis, sendo a segunda variável, threshold, a que iremos utilizar no momento. Nela está presente uma máscara binária da imagem original, com ela poderemos realizar operações nas imagens.

Além disso, existe o processo de *threshold* adaptativo. Esse processo é usado para retirar condições de sombras nas imagens.

```python
thMean = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_MEAN_C,/
	cv2.THRESH_BINARY, block_size, C)
thGauss = cv2.adaptiveThreshold(img, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,/
	cv2.THRESH_BINARY, block_size, C)
```
As variáveis block_size e C, são, respectivamente, o tamanho da vizinhança, geralmente usado o valor 11, e uma constante para subtrair na média calculada, geralmente usado o valor 2.

- **MEAN_C**: realiza o limiar (threshold) pela média da vizinhança da área
- **GAUSSIAN_C**: limiar realizado pela soma ponderada da vizinhança através de pesos definidos pela janela gaussiana.

## Máscaras
Para criarmos máscaras e conseguirmos detectar cores ou objetos em imagens ou vídeos, necessitados realizar alguns passos:
- Capturar a imagem
- Converter de BGR para HSV
- Utilizar as técnicas de threshold para imagens em HSV, definindo os limites de cores
- Extrair a cores desejada utilizando as operações de bitwise na imagem, utilizando a máscara resultante do processo anterior

Segue exemplo um código para extrair a cor vermelha da imagem abaixo:
![smarties](smarties.png)
```python
# Leitura da imagem em cor, BRG
frame = cv2.imread('smarties.png')
# Transforma a imagem em HSV
hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
# Definir os limites inferiores e superiores, em HSV, das cores desejadas
# Usando a biblioteca numpy para definir os arrays
l_r = np.array([0, 100, 100])
u_r = np.array([10, 255, 255])
# Extrai a máscara, aplicando thresholding em imagens HSV, com os limites criados
maskRed = cv2.inRange(hsv, l_r, u_r)
# Aplica a operação bitwise AND, sobrepondo o próprio frame através da máscara criada
resRed = cv2.bitwise_and(frame, frame, mask=maskRed)

# Mostra a imagem final
cv2.imshow('frame', frame)
cv2.imshow('red', maskRed)
cv2.imshow('res', res)

cv2.waitKey(0)
cv2.destroyAllWindows()
```

## Equalização de Histograma
É a representação gráfica da quantidade de pixels presentes na imagem em função da tonalidade dos mesmos. A tonalidade dos pixels varia de 0 à 255, onde 0 é a cor preta absoluta e 255 é a cor absoluta. Ao tratar-se de um histograma em escala de cinza, 255 será o branco absoluto. Em uma imagem RGB, caso tratemos da cor vermelha, 255 será o vermelho absoluto, e assim segue para as cores azul e verde.
```python
img = cv2.imread('lena.jpg')
imgCinza = cv2.cvtColor(img, cv2.BGR2GRAY)

plt.hist(img.ravel(), 256, [0 255])
plt.show()
```

A equalização de histograma é um processo para ajustar o contraste de um imagem, sem perda de informação. Sendo dividido em 5 seções: preto, tons escuros, tons médios, tons claros e branco, o histograma pode possuir cores em qualquer uma dessas seções, além de poder possuir partes com poucos ou nenhum pixel. Para uma detecção de bordas mais precisa, recomenda-se que o histograma contemple as seções PRETO e BRANCO com maior quantidade de pixels, seguindo-se das seções de TONS CLAROS e ESCUROS, visando o menor número possível nos TONS MÉDIOS. Dessa forma, a equalização "expande" o histograma para ambos os lados, deixando os pixels claros mais claros e os pixels escuros mais escuros.

```python
resultado = cv2.equalizeHist(img)
```
A variável resultado retorna a imagem equalizada através do histograma.

## Filtragem
Através de filtros de ruídos, podemos tornar uma imagem mais limpa. Tem-se várias opções de técnicas disponíveis para realizar esse procedimento. Os filtros passa-baixa são técnicas capazes de filtrar um sinal, permitindo que somente as frequências baixas estejam na saída, reduzindo os ruídos.

* **Filtro Média**
O filtro média realiza um media por todos os pixels na área.
	```python
	imagem = cv2.blur(img, (5,5))
	```

* **Filtro de Gauss**
O filtro de Gauss é um filtro passa-baixa que utiliza uma matriz pré-definida como máscara, para realizar operações matriciais com a matriz de pixels.

	```python
	imagem = cv2.GaussianBlur(img, (5,5), 0)
	```
* **Filtro Bilateral**
O filtro bilateral substitui a intensidade de cada pixel através de uma média ponderada através de um valor de intensidade de pixel dos vizinhos.

	```python
	imagem = imagem = cv2.bilateralFilter(img, 9, 75, 75)
	```
* **Filtro de Mediana**
Outra opção é o filtro média, que suaviza os valores da intensidade luminosa de cada pixel pela média dos valores ao redor.

	```python
	imagem = cv2.medianBlur(img, 5))
	```

## Detecção de Bordas
As bordas em uma imagem são tratadas como gradientes que apontam perpendiculares a essas bordas. Basicamente, detectar uma borda consiste em filtrar uma altas frequências, ou uma faixa de frequências. Então, o detector de bordas que apresentar melhor resultado é o Canny. Observe que é importante transforma a imagem para escala de cinza.
```python
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
canny = cv2.Canny(img, nivelDown, nivelUp)
```
Sendo nivelDown o limite inferior e o nivelUp sendo limite superior, geralmente, usados 100 e 200, respectivamente.

## Escrever Contornos
Através de um detector de continuidade de bordas, é possível filtrar quais bordas pertencem ao contorno de um objeto de uma imagem digital.
```python
(contours,_) = cv2.findContours(canny.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
```
Essa função exige três parâmetros, sendo o primeiro eles uma imagem com as bordas definidas da imagem original, o segundo é modelo do contorno e o terceiro e o método utilizado para descrever o contorno.

Após ter todos os contornos, é possível realizar o desenho desses contornos para melhor visualizar, utilizando o método *drawContours*.
```python
cv2.drawCountours(img, contours, -1, (0, 0, 255), 2)
```

-----------

### Extra

* Ajuste Gama
* Estimativa de Área e Perímetro
* Detecção de Círculos
* Detecção de Polígonos
* Escrever Bordas Convexas
* Detecção de objetos com Haar Cascade

[comment]: <> (<iframe src="https://youtu.be/1i5-OumkKCc"></iframe>)
