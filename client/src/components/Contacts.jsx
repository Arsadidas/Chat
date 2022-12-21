import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import Logo from '../assets/logo.svg'

const Contacts = ({contacts, currentUser, handleChatChange}) => {

    const [currentUserName, setCurrentUserName] = useState(undefined)

    const [currentUserImage, setCurrentUserImage] = useState(undefined)

    const [currentSelector, setCurrentSelector] = useState(undefined)


    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.userName)
        }
    }, [currentUser])

    const changeCurrentChat = (index, contact) => {
        setCurrentSelector(index)
        handleChatChange(contact)
    }

    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className="brand">
                        <img src={Logo} alt="Logo"/>
                        <h3>Snappy</h3>
                    </div>
                    <div className="contacts">
                        {contacts.map((contact, index) => {
                            return (
                                <div key={index} onClick={() => changeCurrentChat(index, contact)}
                                     className={`contact ${index === currentSelector ? 'selected' : ""} `}>
                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt=""/>
                                    </div>
                                    <div className="userName">
                                        <h3>{contact.userName}</h3>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="currentUser">
                        <div className="avatar">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt=""/>
                        </div>
                        <div className="userName">
                            <h2>{currentUserName.userName}</h2>
                        </div>
                    </div>
                </Container>
            )}
        </>
    );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .userName {
        h3 {
          color: white;
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .currentUser {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .userName {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .userName {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;

export default Contacts;