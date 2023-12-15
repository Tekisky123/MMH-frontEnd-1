import React, { useState } from "react";
import "../../Assets/Styles/Yojna.css";

const cardsData = [
  {
    id: 1,
    title: "Ayushman Bharat",
    imageUrl:
      "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2019/06/ayushman-bharat-t2-1549021906-1561226597.jpg",
    details: `This scheme came into existence because of recommendations made by
    the National Health Policy. Ayushman Bharat Yojana is designed
    keeping in mind Universal Health Coverage (UHC). Health services in
    India are largely segmented and Ayushman Bharat aims to make them
    comprehensive. It is about looking at the health sector as a whole
    and ensure continuous care for the people of India.`,
  },

  {
    id: 2,
    title: "Mahatma Jyotiba Phule Jan Arogya Yojana",
    imageUrl:
      "https://www.freshersnow.com/wp-content/uploads/2021/12/Mahatma-Jyotiba-Phule-Jan-Arogya-Yojana.png",
    details: `121 follow-up packages, and 971 procedures. Apart from this, a
    beneficiary family will receive Rs.1.5 lakh hospitalization cover if
    any of the family members undergo medical treatment in a hospital
    which is listed under this scheme. What is Covered?`,
  },
  {
    id: 3,
    title: "Pradhan Mantri Suraksha Bima Yojana",
    imageUrl: "https://www.ccbjhalawar.com/images/pmsby-details.jpg",
    details: `Pradhan Mantri Suraksha Bima Yojana aims to provide accident
    insurance cover to the people of India. People in the age group of
    18 years to 70 years who have an account in a bank can avail benefit
    from this scheme. This policy provides an annual cover of Rs 2 lakh
    for total disability and death cover and Rs 1 lakh for partial
    disability. The policy premium gets automatically debited from the
    policyholder’s bank account.`,
  },
  {
    id: 4,
    title: "Pradhan Mantri Surakshit Matritva Abhiyan",
    imageUrl:
      "https://www.impactguru.com/info/wp-content/uploads/2023/04/Pradhan-Mantri-Surakshit-Matritva-Abhiyan-PMSMA-1200-x-800.jpg",
    details: `Welcome To PMSMA The Pradhan Mantri Surakshit Matritva Abhiyan has
    been launched by the Ministry of Health & Family Welfare (MoHFW),
    Government of India. The program aims to provide assured,
    comprehensive and quality antenatal care, free of cost, universally to
    all pregnant women on the 9th of every month..`,
  },
  {
    id: 5,
    title: "Pradhan Mantri Suraksha Bima Yojana",
    imageUrl: "https://www.ccbjhalawar.com/images/pmsby-details.jpg",
    details: ` Pradhan Mantri Suraksha Bima Yojana aims to provide accident insurance
    cover to the people of India. People in the age group of 18 years to
    70 years who have an account in a bank can avail benefit from this
    scheme. This policy provides an annual cover of Rs 2 lakh for total
    disability and death cover and Rs 1 lakh for partial disability. The
    policy premium gets automatically debited from the policyholder’s bank
    account.`,
  },
  {
    id: 6,
    title: "National Health Mission (NHM)",
    imageUrl:
      "https://www.godigit.com/content/dam/godigit/directportal/en/contenthm/national-rural-health-mission.jpg",
    details: `The National Health Mission (NHM) is a flagship initiative 
    of the Government of India aimed at providing accessible, affordable,
     and quality healthcare to the rural population. It was launched in 2013, 
     integrating two major health programs – the National Rural Health Mission 
     (NRHM) and the National Urban Health Mission (NUHM)`,
  },
  {
    id: 7,
    title: "Rashtriya Swasthya Bima Yojana (RSBY)",
    imageUrl:
      "https://images.ctfassets.net/uwf0n1j71a7j/IwDMa2FgKqTtHdH5Hs2be/7a208529af4db38c77bd214f76ee0936/rsby-rashtriya-swasthya-bima-yojana.png",
    details: `This was a health insurance scheme for below-poverty-line (BPL) families.
    Beneficiaries were provided with a smart card that could be used
     in empaneled hospitals for cashless treatment.`,
  },
  {
    id: 8,
    title: "Pradhan Mantri Swasthya Suraksha Yojana (PMSSY)",
    imageUrl:
      "https://ehealth.eletsonline.com/wp-content/uploads/2021/03/pm-yojna.png",
    details: `Focused on correcting the imbalances in the availability
     of affordable and reliable tertiary healthcare services.It aimed 
     to augment facilities for quality medical education in the country.`,
  },
  {
    id: 9,
    title: "National Mental Health Policy and Mental Health Program",
    imageUrl:
      "https://bizgossips.in/uploads/images/202303/image_870x_641ed8e649397.jpg",
    details: `Focuses on promoting mental health, preventing mental illnesses, and ensuring access to mental health services.`,
  },
  {
    id: 10,
    title: "Janani Suraksha Yojana (JSY)",
    imageUrl:
      "https://cdn.zeebiz.com/hindi/sites/default/files/styles/zeebiz_850x478/public/2022/06/05/88065-jsy.jpg",
    details: `A safe motherhood intervention under the National Rural
     Health Mission (NRHM).It provides cash assistance to pregnant women
      for institutional delivery.`,
  },
  {
    id: 11,
    title: "National Tuberculosis Elimination Program (NTEP)",
    imageUrl:
      "https://mma.prnewswire.com/media/1319045/NTEP.jpg?p=facebook",
    details: `Focused on eradicating tuberculosis (TB) in India through 
    various strategies, including early detection, treatment, and public
     awareness.`,
  },
  {
    id: 12,
    title: "National AIDS Control Program (NACP)",
    imageUrl:
      "https://papertyari.com/wp-content/uploads/2020/03/National-AIDS-Control-Programme.png",
    details: `A comprehensive program to prevent and control the spread of
     HIV/AIDS in the country. It includes prevention, care, support, and 
     treatment initiatives.`,
  },
];

const Card = ({ id, title, imageUrl, onViewYojna }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h6>⚫ -{title}</h6>
      <button onClick={() => onViewYojna(id)}>View Yojna</button>
    </div>
  );
};

const Yojna = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const onViewYojna = (cardId) => {
    setSelectedCard(cardId);
  };
  const onCloseAsideBar = () => {
    setSelectedCard(null);
  };
  return (
    <div className="app">
      <div className="cards-container">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            imageUrl={card.imageUrl}
            onViewYojna={onViewYojna}
          />
        ))}
      </div>
      {selectedCard !== null && (
        <aside className="aside-bar">
          <button className="close-btn" onClick={onCloseAsideBar}>
            ❌
          </button>
          <h2>{cardsData[selectedCard - 1].title}</h2>
          <img
            src={cardsData[selectedCard - 1].imageUrl}
            alt={cardsData[selectedCard - 1].title}
          />
          <h4 className="details">{cardsData[selectedCard - 1].details}</h4>
        </aside>
      )}
    </div>
  );
};

export default Yojna;
