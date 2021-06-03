import React from 'react'
import monster from '../../../image/monstergym.png';
import iherb from '../../../image/iherb.png';
import speedns from '../../../image/speedns.png';
import muscle from '../../../image/365muscle.png';
import bodynine from '../../../image/bodynine.png';
import food from '../../../image/food.png';
import heo from '../../../image/heo.png';
import imdark from '../../../image/imdark.png';
import no1bodyup from '../../../image/no1bodyup.png';
import nobrand from '../../../image/nobrand.png';
import rabbit from '../../../image/rabbit.png';
import ranking from '../../../image/ranking.png';
import myprotein from '../../../image/myprotein.png';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize: '1rem',
        }}>
            <br /><br /><br /><br /><br />
            <div style={{ margin: '10px', float: 'left' }}>
                <a href="https://www.monstermart.net/">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={monster} width="200px" height="60px" alt="몬스터짐" />
                </a>
                <a href="https://kr.iherb.com/?utm_source=naverbs_pc&utm_medium=cpc&utm_campaign=iHerb&utm_content=Appsale_NBhome">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={iherb} width="200px" height="60px" />
                </a>
                <a href="https://speedns.net/main/index">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={speedns} width="200px" height="60px" />
                </a>
                <a href="https://www.365muscle.com/main/index">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={muscle} width="200px" height="60px" />
                </a>
                <a href="http://bodynine.com/index.html">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={bodynine} width="200px" height="60px" />
                </a>
                <a href="https://www.thebenefood.co.kr/?NaPm=ct%3Dkpgp1eig%7Cci%3D0z80000xC%5Fvu7q30Bfks%7Ctr%3Dbrnd%7Chk%3D9f0fcd4323efbc5c6fdf14df684897234a14b0ba">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={food} width="200px" height="60px" />
                </a>
                <a href="https://www.myprotein.co.kr/">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={myprotein} width="200px" height="60px" />
                </a>
            </div>
            <br />
            <div style={{ marginTop: '5px', marginBottom: '20px', float: 'left' }}>
                <a href="http://www.heodak.com/?NaPm=ct%3Dkpgp3lio%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3D%7Chk%3Df6b37ee265c9fd1b30972bc06dad0832ead88a56">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={heo} width="200px" height="60px" />
                </a>
                <a href="https://www.imdak.com/main/index.php?&utm_source=naver_bs_pc&utm_medium=brand&utm_campaign=home_link&utm_term=%ED%99%88%EB%A7%81%ED%81%AC&utm_content=%ED%99%88%EB%A7%81%ED%81%AC&n_media=27758&n_query=%EC%95%84%EC%9E%84%EB%8B%AD&n_rank=1&n_ad_group=grp-a001-04-000000018422177&n_ad=nad-a001-04-000000135881320&n_keyword_id=nkw-a001-04-000003308192623&n_keyword=%EC%95%84%EC%9E%84%EB%8B%AD&n_campaign_type=4&n_contract=tct-a001-04-000000000345334&n_ad_group_type=5&NaPm=ct%3Dkpgp6m0g%7Cci%3D0zK0000kCpvulU04beZK%7Ctr%3Dbrnd%7Chk%3D5f7e300ce371070e816f2cb82321a94e8c22f3ad">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={imdark} width="200px" height="60px" />
                </a>
                <a href="https://www.bodyup.kr/?NaPm=ct%3Dkpgp7o2v%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3D%7Chk%3Da36c4210c2c09e74925df77a5e7091cf061e0fdd">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={no1bodyup} width="200px" height="60px" />
                </a>
                <a href="http://m.emart.ssg.com/specialStore/nobrand/main.ssg">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={nobrand} width="200px" height="60px" />
                </a>
                <a href="http://www.6ki.kr/">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={rabbit} width="200px" height="60px" />
                </a>
                <a href="https://www.rankingdak.com/?utm_source=New_brandsearch&utm_medium=brandsearch&utm_campaign=NaveBS_pc">
                    <img style={{ marginRight: '20px', border: '1px solid black' }} src={ranking} width="200px" height="60px" />
                </a>
            </div>
            동의대학교 컴퓨터소프트웨어공학과 학생 15학번 공성현 이세진 박희준<br />
            <br /><br /><br /><br /><br />
        </div>
    )
}

export default Footer
