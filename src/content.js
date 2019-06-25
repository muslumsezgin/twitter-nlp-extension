/*global chrome*/
/* src/content.js */
import React from 'react';
import ReactDOM from 'react-dom';
import Frame, {FrameContextConsumer} from 'react-frame-component';
import "./twitter_core.css";
import "./style.css";
import "./content.css";
import {Hint, HorizontalGridLines, MarkSeries, VerticalGridLines, XAxis, XYPlot, YAxis} from 'react-vis';
import {transformValueToString} from "react-vis/es/utils/data-utils";

const url = 'https://api.mamcose.com/sentiment/invocations';
const url2 = 'https://api.mamcose.com/sentiment/analysisUser';
// const url = 'http://192.168.43.231:3000/invocations';
let ids = []

function getRandomData() {
    return new Array(100).fill(0).map(row => ({
        x: new Date(2019, Math.random() * 10 % 12, Math.random() * 10 % 30),
        y: ((Math.random() * 100 % 50) + 50).toFixed(0),
        size: (Math.random() * 15).toFixed(0),
        color: (Math.random() * 10 % 1).toFixed(0),
        opacity: (Math.random() * 0.5 + 0.35).toFixed(2),
        type: "Positive",
        tweet: "Helal be size alkışı hak ettiniz. 👏"
    }));
}

const randomData = [
    {
        "x": new Date("2019-06-17 11:32:27"),
        "y": 81,
        "size": 8.25,
        "color": 0,
        "opacity": 0.81,
        "title": "Negative",
        "tweet": "Mis gibi  https://t.co/rwJewfKUxs"
    },
    {
        "x": new Date("2019-06-16 08:10:42"),
        "y": 83,
        "size": 9.5,
        "color": 0,
        "opacity": 0.83,
        "title": "Negative",
        "tweet": "Babalar gününüz kutlu olsun,babalar :)"
    },
    {
        "x": new Date("2019-06-15 14:11:06"),
        "y": 70,
        "size": 35,
        "color": 1,
        "opacity": 0.7,
        "title": "Positive",
        "tweet": "Değerli abimiz Enis Fosforoğlu’ndan aldığımız taburcu olduğuna dair güzel haberle mutlu olduk umarım en yakın zaman… https://t.co/lSTqAI6IgO"
    },
    {
        "x": new Date("2019-06-13 09:59:54"),
        "y": 90,
        "size": 10.5,
        "color": 1,
        "opacity": 0.9,
        "title": "Positive",
        "tweet": "RT @rehaerdemm: Atlantik Film 25 yaşında!🌲"
    },
    {
        "x": new Date("2019-06-10 12:43:17"),
        "y": 74,
        "size": 8.5,
        "color": 0,
        "opacity": 0.74,
        "title": "Negative",
        "tweet": "İyi Kalite https://t.co/UlH5KiR4AG"
    },
    {
        "x": new Date("2019-06-10 09:50:21"),
        "y": 100,
        "size": 11.5,
        "color": 1,
        "opacity": 1,
        "title": "Positive",
        "tweet": "Cok güzel bir eser ... https://t.co/7PeYoUAxtx"
    },
    {
        "x": new Date("2019-06-03 19:46:20"),
        "y": 90,
        "size": 13.75,
        "color": 0,
        "opacity": 0.9,
        "title": "Negative",
        "tweet": "Tüm sevdiklerime,tüm sevenlerime iyi bayramlar dilerim."
    },
    {
        "x": new Date("2019-05-30 02:28:25"),
        "y": 50,
        "size": 23.25,
        "color": 0,
        "opacity": 0.5,
        "title": "Positive",
        "tweet": "Celalcim bir eserime drumcover yapmış...Cok sevdim...Helal V Celal 🤘🏻 https://t.co/WSU3Clgvc5"
    },
    {
        "x": new Date("2019-05-24 23:35:55"),
        "y": 81,
        "size": 5.75,
        "color": 0,
        "opacity": 0.81,
        "title": "Negative",
        "tweet": "https://t.co/EGz8ppz76N"
    },
    {
        "x": new Date("2019-05-24 23:35:53"),
        "y": 100,
        "size": 22,
        "color": 1,
        "opacity": 1,
        "title": "Positive",
        "tweet": "İzmir ‘de güzel bir gece ve ben :) (fotoğrafda solda küçük olan) https://t.co/uz2qM7OEDY"
    },
    {
        "x": new Date("2019-05-22 23:13:41"),
        "y": 60,
        "size": 27.75,
        "color": 1,
        "opacity": 0.6,
        "title": "Positive",
        "tweet": "Bilal Karaman benim müziğimi beğenmiş...Çok hoşuma gitti bu iş :) Bilal iyi misin ? :)) https://t.co/d4dm8pm0Cl"
    },
    {
        "x": new Date("2019-05-22 22:39:33"),
        "y": 81,
        "size": 21.5,
        "color": 0,
        "opacity": 0.81,
        "title": "Negative",
        "tweet": "Have you heard ‘Vice Vice Baby’ by @cmylmz on #SoundCloud? #np https://t.co/llGKgnm0MG"
    },
    {
        "x": new Date("2019-05-22 21:40:44"),
        "y": 81,
        "size": 20,
        "color": 0,
        "opacity": 0.81,
        "title": "Negative",
        "tweet": "Have you heard ‘Die Dust’ by @cmylmz on #SoundCloud? #np https://t.co/4aeQm8BPrq"
    },
    {
        "x": new Date("2019-05-22 17:57:31"),
        "y": 77,
        "size": 35,
        "color": 0,
        "opacity": 0.77,
        "title": "Negative",
        "tweet": "Evet ! Sanatçıya kıymet verilmiyor doğru,verilse Yavuz abinin oyuncu değil yönetmen olduğunu bilirdiniz ! Duyar yap… https://t.co/vvVgnvAIec"
    },
    {
        "x": new Date("2019-05-22 17:40:09"),
        "y": 87,
        "size": 33.5,
        "color": 0,
        "opacity": 0.87,
        "title": "Negative",
        "tweet": "Değerli büyüğümüz sinema emekçisi Yavuz Özkan abimizin mekanı cennet olsun,tüm sevenlerine başsağlığı dilerim. https://t.co/L13aZ7EeTn"
    },
    {
        "x": new Date("2019-05-22 14:04:17"),
        "y": 70,
        "size": 35,
        "color": 1,
        "opacity": 0.7,
        "title": "Positive",
        "tweet": "Sevgili kardeşim dünyaca ünlü @MahmutOrhann ve arkadaşlarının bu güzel projesini tebrik ediyor tüm güzellikleri pay… https://t.co/sDQBEsjeYM"
    },
    {
        "x": new Date("2019-05-19 19:11:58"),
        "y": 75,
        "size": 32.25,
        "color": 0,
        "opacity": 0.75,
        "title": "Negative",
        "tweet": "Tebrikler Galatasaray...Şampiyonluk kutlayan tüm Galatasaraylılara nice başarılar dilerim...(çünkü Fenerli olmak bunu gerektirir)"
    },
    {
        "x": new Date("2019-05-19 15:30:49"),
        "y": 71,
        "size": 35,
        "color": 0,
        "opacity": 0.71,
        "title": "Negative",
        "tweet": "RT @trtarsiv: Atatürk, geleceği neden gençlere emanet etmiştir? \n1979 yılında konuyla ilgili verilen cevaplar… \nhttps://t.co/EPstqUWKAb\n #1…"
    },
    {
        "x": new Date("2019-05-18 21:17:10"),
        "y": 81,
        "size": 23.75,
        "color": 0,
        "opacity": 0.81,
        "title": "Negative",
        "tweet": "Biz 23 Nisanlarda 19 Mayıslarda 30 Ağustoslarda doğanlardanız :) @cmylmz @GuvenOzan @zaferalgoz"
    },
    {
        "x": new Date("2019-05-18 21:13:45"),
        "y": 80,
        "size": 35,
        "color": 1,
        "opacity": 0.8,
        "title": "Positive",
        "tweet": "Ne güzel bir gün başlıyor...19 mayıs Atatürk ü Anma,Gençlik ve Spor Bayramınız kutlu olsun ey güzel gençler....Eski… https://t.co/iQmtJKKQHC"
    }
]

class Main extends React.Component {
    state = {
        loadingProfile: false,
        loadingText: false,
        showText: false,
        showProfile: false,
        text: "",
        textResponse: null,
        nickname: "",
        settings: false,
        data: null,
        value: false,
        algorithm: "LogisticRegression",
        settingsAnalysis: "aoff",
        settingsSansur: "son",
        neg:0,
        pos:0
    }

    constructor(props) {
        super(props);
        this.executeAllCheck()
    }

    componentDidMount() {
        setInterval(this.executeAllCheck, 10000)
    }

    executeAllCheck = () => {
        this.profileSentimentButton()
        this.streamSentimentCheck()
    }

    streamSentimentCheck = () => {
        if (this.state.settingsAnalysis === "aon") {
            const stream = document.getElementById('stream-items-id');
            const children = Array.from(stream.children);
            children.forEach((li, i) => {
                const id = li.getAttribute("id");
                const index = ids.indexOf(id);
                if (index === -1) {
                    ids.push(id)
                    this.sentimentRender(li, id)
                }
            })
        }
    }

    sentimentRender(li, id) {
        const text = li.getElementsByClassName("TweetTextSize").item(0);
        if (text) {
            const payload = {
                method: 'post',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify({"input": [{"text": text.textContent}], "classifier": this.state.algorithm})
            };

            fetch(url, payload).then(r => r.json()).then(res => {
                const label = res.output[0].label;
                const percent = res.output[0].percent.toFixed(2) * 100;
                if (label === "Negative" && this.state.settingsSansur === "son") {
                    const elementId = `${id}-show`;
                    li.setAttribute("class", "js-stream-item stream-item stream-item blur-tweet")
                    const showHtml = "<div class=\"tweet-border none-cursor js-stream-item stream-item stream-item\">\n" +
                        "        <span class='show-negative-info'>Olumsuz Görüş İçerir</span>" +
                        "        <p class='show-negative-info'><button id=\"" + elementId + "\" type=\"button\" " +
                        "                   class=\"btn-link\" style=\"display: inline-block;\">Tweeti Görüntüle ↑</button></p>" +
                        "    </div>"
                    li.insertAdjacentHTML("afterend", showHtml);
                    li.children[0].style.borderBottom = 'none';

                    document.getElementById(elementId).addEventListener('click', () => {
                        li.setAttribute("class", "js-stream-item stream-item stream-item")
                        document.getElementById(elementId).remove()
                    })
                }
                const element = li.getElementsByClassName("ProfileTweet-actionList js-actions").item(0);
                element && element.insertAdjacentHTML("beforeend", this.sentimentIcon(label, percent))
            });
        }
    }

    sentimentIcon = (sentiment, value) => {
        const color = sentiment === 'Positive' ? "icon-sentiment-positive" : "icon-sentiment-negative"
        const icon = sentiment === 'Positive' ? "Icon--smileRating5" : "Icon--smileRating1"
        return (
            "<div class=\"ProfileTweet-action \">\n" +
            "<button class=\"ProfileTweet-actionButtonUndo\"  type=\"button\">\n" +
            "    <div class=\"IconContainer js-tooltip\" data-original-title=\"Sentiment\">\n" +
            "      <span class=\"Icon Icon--medium " + icon + " " + color + "\"/>\n" +
            "      <span class=\"u-hiddenVisually\">Sentiment</span>\n" +
            "    </div>\n" +
            "      <span class=\"ProfileTweet-actionCount\">\n" +
            "    <span class=\"ProfileTweet-actionCountForPresentation " + color + "\" aria-hidden=\"true\">" + value + "%</span>\n" +
            "  </span>\n" +
            "  </button>\n" +
            "</div>"
        )
    }

    profileSentimentButton = () => {
        let tab = document.getElementsByClassName("ProfileHeading-toggle").item(0);
        const element = document.getElementById("profile-semantic-button");
        if (tab && !element) {
            tab.innerHTML += "<li id='profile-semantic-button' class=\"ProfileHeading-toggleItem  u-textUserColor\">" +
                "                <a class=\"ProfileHeading-toggleLink js-nav pointer-cursor\">" +
                "                  Duygu Analizi" +
                "                </a>" +
                "            </li>";
            document.getElementById("profile-semantic-button").addEventListener('click', this.profileSentimentButtonAction)
        }
    }

    profileSentimentButtonAction = () => {
        const nickname = document.getElementsByClassName("u-linkComplex-target").item(0).textContent
        this.setState({
            loadingProfile: true,
            nickname: nickname
        }, () => {
            open()
            fetch(url2 + "/" + nickname + "/" + this.state.algorithm).then(r => r.json()).then(res => {
                let list = []
                let neg = 0, pos=0;
                res.output.map(i => {
                    list.push({...i, x: new Date(i.x)})
                    if(i.title === "Negatif")
                        neg++
                    else
                        pos++
                })
                setTimeout(() => this.setState({loadingProfile: false, data: list,neg,pos}), 3500)
            });

        })
    }
    textAnalysisAction = () => {
        this.setState({loadingText: true})
        const payload = {
            method: 'post',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({"input": [{"text": this.state.text}], "classifier": this.state.algorithm})
        };

        fetch(url, payload).then(r => r.json()).then(res => {
            const label = res.output[0].label;
            const percent = res.output[0].percent.toFixed(2) * 100;
            this.setState({loadingText: false, textResponse: {text: this.state.text, label, percent}})
        });
    }

    defaultFormat(value) {
        return [
            {
                "title": 'Tweet',
                "value": value.tweet.length > 35 ?
                    value.tweet.substring(0, 32) + "..." :
                    value.tweet
            },
            {
                "title": 'Tarih',
                "value": value.x.toLocaleDateString("tr-TR")
            },
            {
                "title": 'Etiket',
                "value": "%" + value.y + " " + value.title
            }
        ]
    }

    render() {
        const {loading, loadingMessage, text, value, textResponse, loadingText, loadingProfile, data, nickname, settingsAnalysis, settingsSansur, algorithm, pos, neg} = this.state
        const markSeriesProps = {
            animation: true,
            className: 'mark-series-example',
            sizeRange: [5, 10],
            seriesId: 'my-example-scatterplot',
            colorRange: ['#e0245e', '#17bf63'],
            opacityType: 'literal',
            data,
            onNearestXY: value => this.setState({value})
        };

        return (
            <Frame head={[<link type="text/css" rel="stylesheet"
                                href={chrome.runtime.getURL("/static/css/content.css")}/>]}>
                <FrameContextConsumer>{({document, window}) => {
                    return (
                        <div className={'my-extension'}>

                            <div aria-labelledby="content-main-heading" className="content-main">
                                <div className="content-header">
                                    <div className="header-inner">
                                        <h2>Sentiment Analiz</h2>
                                    </div>
                                </div>
                                <div className="content-inner no-stream-end">
                                    <form className="t1-form form-horizontal requires-password">

                                        <div className="control-group">
                                            <label className="t1-label control-label">Tweet</label>
                                            <div className="controls">
                                                <input type="text" value={text}
                                                       onChange={e => this.setState({text: e.target.value})}/>
                                            </div>
                                        </div>

                                        <div className="controls">
                                            <div className="ProfileHeading-content">
                                                <ul className="ProfileHeading-toggle">
                                                    <li className="ProfileHeading-toggleItem  u-textUserColor">
                                                        <a className="ProfileHeading-toggleLink js-nav"
                                                           onClick={this.textAnalysisAction}>
                                                            Analiz Et
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {(loadingText || textResponse !== null) && <div>
                                            <hr/>
                                            <h3 className="settings-header">Metin Analizi</h3>
                                            {loadingText ? <div className="control-group">
                                                <label className="t1-label control-label">Analiz</label>
                                                <div className="controls">
                                                    <img src={require('./img/spinner-rosetta-blue-26x26.gif')}
                                                         alt={"spinner"}/>
                                                </div>
                                            </div> : <div>
                                                <fieldset className="control-group">
                                                    <legend className="control-label">Metin</legend>
                                                    <div className="controls">
                                                        <div className="personalization-field">
                                                            <label
                                                                className="personalization-status">{textResponse.text}</label>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="control-group">
                                                    <legend className="control-label">Etiket</legend>
                                                    <div className="controls">
                                                        <div className="personalization-field">
                                                            <label
                                                                className="personalization-status">{textResponse.label}</label>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                                <fieldset className="control-group">
                                                    <legend className="control-label">Oran</legend>
                                                    <div className="controls">
                                                        <div className="personalization-field">
                                                            <label
                                                                className="personalization-status">%{textResponse.percent}</label>
                                                        </div>
                                                    </div>
                                                </fieldset>
                                            </div>
                                            }

                                        </div>}


                                        {(loadingProfile || data !== null) && <div>
                                            <hr/>
                                            <h3 className="settings-header">Profil Analizi</h3>
                                            {loadingProfile ?
                                                <div className="control-group">
                                                    <label className="t1-label control-label">Analiz</label>
                                                    <div className="controls">
                                                        <label className="t1-label">
                                                            {nickname} analiz ediliyor...
                                                            <img src={require('./img/spinner-rosetta-blue-26x26.gif')}
                                                                 alt={"spinner"}/>
                                                        </label>

                                                    </div>
                                                </div> :
                                                <div>
                                                    <XYPlot
                                                        onMouseLeave={() => this.setState({value: false})}
                                                        width={450}
                                                        height={350}
                                                        margin={{left: 0, right: 0, top: 10, bottom: 40}}
                                                        xType={'time'}
                                                    >
                                                        <VerticalGridLines/>
                                                        <HorizontalGridLines/>
                                                        <XAxis title={"Tarih"}/>
                                                        {/*<YAxis title={"Yüzde"}/>*/}
                                                        <MarkSeries {...markSeriesProps} />
                                                        {value ?
                                                            <Hint format={this.defaultFormat} value={value}/> : null}
                                                    </XYPlot>
                                                    <fieldset className="control-group">
                                                        <legend className="control-label">Toplam Tweet</legend>
                                                        <div className="controls">
                                                            <div className="personalization-field">
                                                                <label className="personalization-status">{data.length}
                                                                    Adet</label>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="control-group">
                                                        <legend className="control-label">Pozitif Tweet</legend>
                                                        <div className="controls">
                                                            <div className="personalization-field">
                                                                <label className="personalization-status">{pos}
                                                                    Adet</label>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="control-group">
                                                        <legend className="control-label">Negatif Tweet</legend>
                                                        <div className="controls">
                                                            <div className="personalization-field">
                                                                <label className="personalization-status">{neg}
                                                                    Adet</label>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>}

                                        </div>}

                                        <hr/>
                                        <h3 className="settings-header">Ayarlar</h3>

                                        <div className="control-group">
                                            <label className="t1-label control-label">Tweet Analizi</label>
                                            <div className="controls">
                                                <select className="t1-select" value={settingsAnalysis}
                                                        onChange={(event => this.setState({settingsAnalysis: event.target.value}))}>
                                                    <option value="aon">Tweetleri Analiz Et</option>
                                                    <option value="aoff">Tweetleri Analiz Etme</option>
                                                </select>
                                                <p className="t1-infotext">Tweetler sentiment analizden
                                                    geçirilip sonuçları işlem butonlarının yanına
                                                    eklenecektir.</p>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="t1-label control-label">Sansür</label>
                                            <div className="controls">
                                                <select className="t1-select" value={settingsSansur}
                                                        onChange={(event => this.setState({settingsSansur: event.target.value}))}>
                                                    <option value="son">Tweetleri Sansürle</option>
                                                    <option value="soff">Tweetleri Sansürleme</option>
                                                </select>
                                                <p className="t1-infotext">Olumsuz içerik olan tweetler
                                                    sansürlenerek blurlu şekilde gösterilecektir.</p>
                                            </div>
                                        </div>
                                        <div className="control-group">
                                            <label className="t1-label control-label">Algoritma</label>
                                            <div className="controls">
                                                <select className="t1-select" value={algorithm}
                                                        onChange={(event => this.setState({algorithm: event.target.value}))}>
                                                    <option value="EnsembleClassifier">Ensemble</option>
                                                    <option value="LinearSVC">Linear SVM</option>
                                                    <option value="randomforest">Random Forest</option>
                                                    <option value="MultinomialNB">Multinominal NB</option>
                                                    <option value="LogisticRegression">Logistic Regression</option>
                                                    <option value="SGDClassifier">SGD</option>
                                                </select>
                                                <p className="t1-infotext">Tweet analizleri seçili makina
                                                    öğrenmesi algoritmasını ile tahmin edilecektir..</p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/*<h1>Semantic Analysis</h1>*/}
                            {/*{loading && <div>*/}
                            {/*    <h3>{loadingMessage}</h3>*/}
                            {/*</div>}*/}


                            {/*<div className={"settings"}>*/}
                            {/*    <h1>Ayarlar</h1>*/}
                            {/*    <div>*/}

                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    )
                }
                }
                </FrameContextConsumer>
            </Frame>
        )
    }
}

const app = document.createElement('div');
app.id = "my-extension-root";

document.body.appendChild(app);
ReactDOM.render(
    <Main/>
    , app);

app.style.display = "none";

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "clicked_browser_action") {
            toggle();
        }
    }
);

function toggle() {
    if (app.style.display === "none") open()
    else hide()
}

function open() {
    app.style.display = "block";
}

function hide() {
    app.style.display = "none";
}