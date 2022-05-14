import style from "./style/index.module.scss"

export const Single = () => {
    return (
        <div className={style["Single"]}>
            <div className="container">
                <div className="nav">

                    <div className="nav-left">
                        {/* 封面 */}
                        <div className="cover">
                            <img src="http://p3.music.126.net/71YQw1K88LS06iMjLRY5CA==/18610333812708195.jpg" alt=""/>
                            <div className="title">
                                <h1>克林</h1>
                                <div>
                                    <span>歌手：</span>
                                    <span>零件</span>
                                </div>
                                <div>
                                <span>专辑：</span>
                                    <span>偶然黄昏见</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-right">
                        <div className="lyrics">
                            <ul>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                                <li>1213</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
