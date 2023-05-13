import React, { useEffect } from "react";
import "./Services.css";
import servicesAndPricesBackground from "../assets/servicesAndPricesBackground.jpg";
import depilBackground from "../assets/depilBackground.jpg";
import cosmetBackground from "../assets/cosmetBackground.jpg";
import brovkiBackground from "../assets/brovkiBackground.jpg";
import manikBackground from "../assets/manikBackground.jpg";
import pedikBackground from "../assets/pedik.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";

const Services = () => {
  const { hash } = useLocation();

  function smoothScrollTo(targetY: number, duration: number) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime: any = null;

    function scrollStep(timestamp: any) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const scrollTop = startY + distance * progress;
      window.scrollTo(0, scrollTop);
      if (progress < 1) window.requestAnimationFrame(scrollStep);
    }

    window.requestAnimationFrame(scrollStep);
  }

  useEffect(() => {
    const scrollDuration = 500;
    if (hash === "#depil") {
      smoothScrollTo(1200, scrollDuration);
    }
    if (hash === "#cosmet") {
      smoothScrollTo(2200, scrollDuration);
    }
    if (hash === "#brovi") {
      smoothScrollTo(3200, scrollDuration);
    }
    if (hash === "#manik") {
      smoothScrollTo(4200, scrollDuration);
    }
  }, [hash]);

  return (
    <div>
      <Header />
      <div className="servicesAndPrices">
        <img src={servicesAndPricesBackground} width="1903px" alt="" />
        <div className="servicesAndPrices__text">
          <p>Услуги и цены</p>
          <p>На этой странице вы узнате о каждой услуге и ее стоимости</p>
        </div>
      </div>

      <div id="depil" className="depilDiv">
        <img src={brovkiBackground} width="1903px" alt="" />
        <Link to={"/events"}>
          <div className="depilDiv__text">
            <h1>Ресницы</h1>

            <p>Что это такое?</p>
            <p>
              Процедура включает в себя не только увеличение объема и длины
              ресниц, но и их окрашивание, укрепление и бережное удаление.
              Косметолог использует только высококачественные средства и самые
              передовые технологии, чтобы достичь идеального результата.
            </p>
          </div>
        </Link>
        <div className="depilDiv__priceList">
          <h1>Стоимость услуг</h1>
          <div>
            <p>Окрашивание ресниц -</p>
            <p className="depilDiv__priceList__priceText">300 ₽</p>
          </div>
          <div>
            <p>Классика -</p>
            <p className="depilDiv__priceList__priceText">1300 ₽</p>
          </div>
          <div>
            <p>Ботекс ресниц -</p>
            <p className="depilDiv__priceList__priceText">1400 ₽</p>
          </div>
          <div>
            <p>Обьем 1.5 -</p>
            <p className="depilDiv__priceList__priceText">1400 ₽</p>
          </div>
          <div>
            <p>Обьем 2D -</p>
            <p className="depilDiv__priceList__priceText">1600 ₽</p>
          </div>
        </div>
      </div>

      <div id="cosmet" className="cosmetDiv">
        <img src={pedikBackground} width="1903px" height={1000} alt="" />
        <Link to={"/events"}>
          <div className="cosmetDiv__text">
            <h1>Педикюр</h1>
            <p>Что это такое?</p>
            <p>
              Это процедура, которая не только ухаживает за ногтями и кожей
              ступней, но и придает ощущение нежности и комфорта для всего тела.
            </p>
          </div>
        </Link>
        <div className="cosmetDiv__priceList">
          <h1>Стоимость услуг</h1>
          <div>
            <p>Педикюр пальчиковый / полный -</p>
            <p className="depilDiv__priceList__priceText">1300 ₽</p>
          </div>
          <div>
            <p>Педикюр пальчиковый + покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">1400 ₽</p>
          </div>
          <div>
            <p>Покрытие гель-лаком на ногах -</p>
            <p className="depilDiv__priceList__priceText">800 ₽</p>
          </div>
          <div>
            <p>Снятие+педикюр полный+покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">1900 ₽</p>
          </div>
          <div>
            <p>Снятие+педикюр пальчиков+покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">1500 ₽</p>
          </div>
        </div>
      </div>
      <div id="brovi" className="broviDiv">
        <img src={cosmetBackground} width="1903px" alt="" />
        <Link to={"/events"}>
          <div className="broviDiv__text">
            <h1>Брови</h1>
            <p>Что это такое?</p>
            <p>
              Процедура включает в себя не только коррекцию бровей и удаление
              ненужных волосков, но и окрашивание, укрепление и формирование
              бровей. В результате клиент получает идеальную форму бровей,
              которая подчеркивает его индивидуальность и красоту.
            </p>
          </div>
        </Link>
        <div className="broviDiv__priceList">
          <h1>Стоимость услуг</h1>
          <div>
            <p>Оформление с окрашиванием бровей (краска/хна) -</p>
            <p className="depilDiv__priceList__priceText">700 ₽</p>
          </div>
          <div>
            <p>Окрашивание бровей (краска/хна) -</p>
            <p className="depilDiv__priceList__priceText">400 ₽</p>
          </div>
          <div>
            <p>Коррекция бровей (нить/Воск,пинцет) -</p>
            <p className="depilDiv__priceList__priceText">400 ₽</p>
          </div>
          <div>
            <p>Долговременная укладка бровей "оформление" -</p>
            <p className="depilDiv__priceList__priceText">1000 ₽</p>
          </div>
          <div>
            <p>
              Долговременная укладка бровей "оформление и окрашивание краской" -
            </p>
            <p className="depilDiv__priceList__priceText">1300 ₽</p>
          </div>
        </div>
      </div>
      <div id="manik" className="manikDiv">
        <img src={manikBackground} width="1903px" alt="" />
        <Link to={"/events"}>
          <div className="manikDiv__text">
            <h1>Маникюр</h1>
            <p>Что это такое?</p>
            <p>
              Маникюр - это косметическая процедура по обработке ногтей на
              пальцах рук и самих кистей рук, а то и всей руки. Маникюр
              выполняется как в салонах красоты или косметологических кабинетах
              квалифицированными специалистами, так и в домашних условиях.
              Маникюр часто совмещается с педикюром, уходом за кожей лица,
              парикмахерскими процедурами (стрижка, окрашивание волос и прочие
              виды ухода за волосами). Часто под словом «маникюр» понимают
              внешний вид, обработку только ногтей.
            </p>
          </div>
        </Link>
        <div className="manikDiv__priceList">
          <h1>Стоимость услуг</h1>
          <div>
            <p>Маникюр комбинированный / аппаратный - </p>
            <p className="depilDiv__priceList__priceText">500 ₽</p>
          </div>
          <div>
            <p>Однотонное покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">700 ₽</p>
          </div>
          <div>
            <p>Однотонное покрытие + комбинированный маникюр - </p>
            <p className="depilDiv__priceList__priceText">1200 ₽</p>
          </div>
          <div>
            <p>Мужской маникюр -</p>
            <p className="depilDiv__priceList__priceText">700 ₽</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
