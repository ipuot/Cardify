import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import EditCardForm from '../../components/EditCardForm/EditCardForm';
import * as cardsAPI from '../../utilities/cards-api';
import { Link } from 'react-router-dom';
import './PersonalBizToken.css';
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
console.log(process.env.REACT_APP_API_KEY, 'HEFLSDFOSK');
console.log(genAI);
console.log(process.env.DATABASE_URL);

async function callGeminiAI(userInput) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Give me a one-sentence tagline for the following user input:" + userInput

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text;
};

export default function PersonalBizToken() {
    const { cardId } = useParams();
    const [card, setCard] = useState(null);
    const [editing, setEditing] = useState(false);
    const currentUser = getUser()._id;
    const cardUserId = card?.user._id;
    const [originalCard, setOriginalCard] = useState(null);

    useEffect(() => {
        async function fetchCard() {
            try {
                const fetchedCard = await cardsAPI.fetchCardById(cardId);
                setCard(fetchedCard);
                setOriginalCard(fetchedCard);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCard().catch((error) => {
            console.error(error);
        });
    }, [cardId]);

    const handleEdit = () => {
        if (currentUser === cardUserId) {
            setEditing(!editing);
        } else {
            console.log('Not authorized to edit post.')
        }
    };

    const handleCancel = () => {
        setEditing(false);
        setCard(originalCard);
    }

    const updateCard = async (updatedCard) => {
        const quote = await callGeminiAI(updatedCard.quote);

        try {
            setEditing(false);
            setCard({
                ...card,
                occupation: updatedCard.occupation,
                email: updatedCard.email,
                phoneNum: updatedCard.phoneNum,
                socials: updatedCard.socials,
                color: updatedCard.color,
                quote: quote
            });
        } catch (error) {
            console.error(error);
        }
    };

    if (!card) {
        return <h3 className="Loading-card-page">Loading...</h3>;
    }

    return (
        <div className="center-container">
            <div className="card-container">
                <div className="card-content">
                    {editing ? (
                        <EditCardForm card={card} updateCard={updateCard} handleCancel={handleCancel} />
                    ) : (
                        <div className="card-layout">
                            <div className="card-user">
                                <h3 className="user-name-card">{card.user.name}</h3>
                                {currentUser === cardUserId && (
                                    <div className="edit-options">
                                        <button className="edit-button-cardpage" onClick={handleEdit} title="Edit">
                                            Edit Card
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="card-body">
                                <div className="left-column">
                                    <h3 className="occupation-h3">{card.occupation}</h3>
                                    <h3 className="socials-h3">{card.socials}</h3>
                                </div>
                                <div className="middle-column">
                                    <h3 className="quote-h3">{card.quote}</h3>

                                </div>
                                <div className="right-column">
                                    <h3 className="email-h3">{card.email}</h3>
                                    <h3 className="phoneNum-h3">{card.phoneNum}</h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}