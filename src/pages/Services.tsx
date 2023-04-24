import React, { useEffect } from "react";
import "./Services.css";
import servicesAndPricesBackground from "../assets/servicesAndPricesBackground.jpg";
import depilBackground from "../assets/depilBackground.jpg";
import cosmetBackground from "../assets/cosmetBackground.jpg";
import brovkiBackground from "../assets/brovkiBackground.jpg";
import manikBackground from "../assets/manikBackground.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

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
        <img src={depilBackground} width="1903px" alt="" />
        <div className="depilDiv__text">
          <h1>Депиляция</h1>
          <p>Что это такое?</p>
          <p>
            Депиляция - удаление надкожной части волосяного покрова. В отличие
            от эпиляции, депиляция не затрагивает волосяные фолликулы, в
            результате чего естественный рост волос не нарушается, поэтому при
            депиляции волосы удаляются временно и спустя непродолжительное время
            отрастают вновь.
          </p>
        </div>
        <div className="depilDiv__priceList">
          <h1>Стоимость услуг</h1>
          <div>
            <p>Ваксинг ноги полностью -</p>
            <p className="depilDiv__priceList__priceText">от 900 ₽</p>
          </div>
          <div>
            <p>Ваксинг область живота -</p>
            <p className="depilDiv__priceList__priceText">от 150 ₽</p>
          </div>
          <div>
            <p>Ваксинг область лица -</p>
            <p className="depilDiv__priceList__priceText">от 150 ₽</p>
          </div>
          <div>
            <p>Ваксинг подмышечных впадин -</p>
            <p className="depilDiv__priceList__priceText">от 300 ₽</p>
          </div>
          <div>
            <p>Ваксинг руки полностью -</p>
            <p className="depilDiv__priceList__priceText">от 500 ₽</p>
          </div>
          <div>
            <p>Шугаринг ноги полностью -</p>
            <p className="depilDiv__priceList__priceText">от 1000 ₽</p>
          </div>
          <div>
            <p>Шугаринг область живота -</p>
            <p className="depilDiv__priceList__priceText">от 150 ₽</p>
          </div>
          <div>
            <p>Шугаринг область лица -</p>
            <p className="depilDiv__priceList__priceText">от 150 ₽</p>
          </div>
          <div>
            <p>Шугаринг подмышечных впадин -</p>
            <p className="depilDiv__priceList__priceText">от 250 ₽</p>
          </div>
          <div>
            <p>Шугаринг руки полностью -</p>
            <p className="depilDiv__priceList__priceText">от 600 ₽</p>
          </div>
        </div>
      </div>
      <div id="cosmet" className="cosmetDiv">
        <img src={cosmetBackground} width="1903px" alt="" />
        <div className="cosmetDiv__text">
          <h1>Косметология</h1>
          <p>Что это такое?</p>
          <p>
            Косметология - это лечение и восстановление эстетических проблем
            кожи лица
          </p>
        </div>
        <div className="cosmetDiv__priceList">
          <h1>Стоимость услуг</h1>
          <div>
            <p>лифтинг - японская планцентарная косметика Curacen 2ml -</p>
            <p className="depilDiv__priceList__priceText">от 10000 ₽</p>
          </div>
          <div>
            <p>Альгинатная маска -</p>
            <p className="depilDiv__priceList__priceText">от 900 ₽</p>
          </div>
          <div>
            <p>Альгинатная маска+сыворотка -</p>
            <p className="depilDiv__priceList__priceText">от 1000 ₽</p>
          </div>
          <div>
            <p>Мезотерапия лица TEGODER -</p>
            <p className="depilDiv__priceList__priceText">от 3500 ₽</p>
          </div>
          <div>
            <p>Антивозрастной коктейль -</p>
            <p className="depilDiv__priceList__priceText">от 2900 ₽</p>
          </div>
          <div>
            <p>Лифтинг - коктейль ДМАЕ+ -</p>
            <p className="depilDiv__priceList__priceText">от 3000 ₽</p>
          </div>
        </div>
      </div>
      <div id="brovi" className="broviDiv">
        <img src={brovkiBackground} width="1903px" alt="" />
        <div className="broviDiv__text">
          <h1>Брови/Ресницы</h1>
          <p>Что это такое?</p>
          <p>Уход, наращивание и окрашивание бровей и ресниц</p>
        </div>
        <div className="broviDiv__priceList">
          <h1>Стоимость услуг</h1>
          <h1>Брови</h1>
          <div>
            <p>Оформление с окрашиванием бровей (краска/хна) -</p>
            <p className="depilDiv__priceList__priceText">от 700 ₽</p>
          </div>
          <div>
            <p>Окрашивание бровей (краска/хна) -</p>
            <p className="depilDiv__priceList__priceText">от 400 ₽</p>
          </div>
          <div>
            <p>Коррекция бровей (нить/Воск,пинцет) -</p>
            <p className="depilDiv__priceList__priceText">от 400 ₽</p>
          </div>
          <div>
            <p>Долговременная укладка бровей "оформление" -</p>
            <p className="depilDiv__priceList__priceText">от 1000 ₽</p>
          </div>
          <div>
            <p>
              Долговременная укладка бровей "оформление и окрашивание краской" -
            </p>
            <p className="depilDiv__priceList__priceText">от 1300 ₽</p>
          </div>
          <h1>Ресницы</h1>
          <div>
            <p>Окрашивание ресниц -</p>
            <p className="depilDiv__priceList__priceText">от 300 ₽</p>
          </div>
          <div>
            <p>Ламинирование ресниц -</p>
            <p className="depilDiv__priceList__priceText">от 1200 ₽</p>
          </div>
          <div>
            <p>Ботекс ресниц -</p>
            <p className="depilDiv__priceList__priceText">от 1400 ₽</p>
          </div>
          <div>
            <p>Удаление волос над губой(нить/воск) -</p>
            <p className="depilDiv__priceList__priceText">от 200 ₽</p>
          </div>
        </div>
      </div>
      <div id="manik" className="manikDiv">
        <img src={manikBackground} width="1903px" alt="" />
        <div className="manikDiv__text">
          <h1>Маникюр</h1>
          <p>Что это такое?</p>
          <p>
            Маникюр - это косметическая процедура по обработке ногтей на пальцах
            рук и самих кистей рук, а то и всей руки. Маникюр выполняется как в
            салонах красоты или косметологических кабинетах квалифицированными
            специалистами, так и в домашних условиях. Маникюр часто совмещается
            с педикюром, уходом за кожей лица, парикмахерскими процедурами
            (стрижка, окрашивание волос и прочие виды ухода за волосами). Часто
            под словом «маникюр» понимают внешний вид, обработку только ногтей.
          </p>
        </div>
        <div className="manikDiv__priceList">
          <h1>Стоимость услуг</h1>
          <h1>Маникюр</h1>
          <div>
            <p>Маникюр комбинированный / аппаратный -</p>
            <p className="depilDiv__priceList__priceText">от 500 ₽</p>
          </div>
          <div>
            <p>Однотонное покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">от 700 ₽</p>
          </div>
          <div>
            <p>Однотонное покрытие + комбинированный маникюр -</p>
            <p className="depilDiv__priceList__priceText">от 1200 ₽</p>
          </div>
          <div>
            <p>Мужской маникюр -</p>
            <p className="depilDiv__priceList__priceText">от 700 ₽</p>
          </div>
          <h1>Педикюр</h1>
          <div>
            <p>Педикюр пальчиковый / полный -</p>
            <p className="depilDiv__priceList__priceText">от 700 ₽ / 1300 ₽</p>
          </div>
          <div>
            <p>Педикюр пальчиковый + покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">от 1400 ₽</p>
          </div>
          <div>
            <p>Педикюр полный + покрытие гель-лаком -</p>
            <p className="depilDiv__priceList__priceText">от 1800 ₽</p>
          </div>
          <div>
            <p>Покрытие гель-лаком на ногах -</p>
            <p className="depilDiv__priceList__priceText">от 800 ₽</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
