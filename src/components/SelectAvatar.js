import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import '../CSS/style.css';

const avatarOptions = [
  'https://s3-alpha-sig.figma.com/img/dcb0/fc38/e0824015ceea206c20ba7f5c9faf58f6?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=kkFiEsH20oidofdu~D1c6t83N~YkMUAwUy~z3HXFJ3iUJpjDZ0bTzs6bIbaIWKyc~rCxqegvIMDyvKmuXRkj6cgVLeGHCkw6HgtIexZ1Dtx073oMt0CS6H7tvU~b1Y7HM59W0q18LiVdixCTWa3UMKuUn1i1CFm8BPh8vfqYXUwNfSUtAFCE2fsZkHmn~BDR-h6Rf~lfACb1ERZwP11I0QdUclZve-wDvkbzT83Z7J3ADP4g0lXr55hg7RZ6pNAT5riyOUZitSX6V1KroJm2l81qx-j6uTVDbLy73kED8ISmto-Z-icudrf1ZKzp3ZEaw60QPXrl7-ZSDcUkzpJd4Q__',
  'https://s3-alpha-sig.figma.com/img/a126/406e/7db63c0b4ebf2d3aa9346e181fcb7581?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SyEYZuzxGASZRm91iHI71FVia5-Fbn48SDg7Nr-gTAp8WeaiMKNDsTXwHDdypKMmPHO28WviO2r2JQMiwDzUJIBiBKC~vywoz8Jk8v5Lgfk7y3Is8UvDZkIHLowOL8GUtmxs3hPu5PIyji06wpKZvnwA0dBz0QAfhFIhQtHvJdIVWanZeCAVtq7AHCovaUpOID9568~80IhyJSUzRg~ZLZAiBLYmrOa6KL9VgmcPUCjrjUaHpBHWaWiGJ5~-jKu73vSvizxBc4qZgnnJ5ogl1-Aq9XWZDHUvm2pI0vzLtB87-hVpUP~Yq07n6xt8jTujuLwRtwhG7D4Nclk2iLmulw__',
  'https://s3-alpha-sig.figma.com/img/24c4/5c06/9c36035e39992fa51e13ce0d5a1c2997?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UzivKyYYva6lw4FardcbsC6r6fOnPiJBbLKqOl0iZzMerlf~fcfmIFY75gUbmjbCgG56RED1Xhhw8MeNimG9zzqrSs9wd7Eras01-QdPZmpDKob8Ay21TCFQYmdySo8imzGITDG1fdE7ogWIGNj6596B3qPZj9BrwP77~wo9Sb8b~0b0E4iM~CtW2ezBLU9zDHp3Eo5U9KaTxWrnHZQLKF13tgmxRo9LEJcYGMHMc5QJft5pfSefWBxkRXTsWxTsQKZ~Q6LoT2vMbgkkQnAj9HGQgunSblXnF4sgw-QenKHQU-qO~01E5rGeSIX9TtZ6M6TX7L2dEh0KwPQHhugb9Q__',
  'https://s3-alpha-sig.figma.com/img/38a8/aa82/88cb8ced309bc659ca0572c30badbb15?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=VWgatAmZKJpkLz761l2anSmW3xQPfahFKQZv9G7bJUv7-Lus0988-qA72KtLxrYBNGzM5lInSHKLiuK6UVRXTSmRHcaFr6UVgWRW3dfhinPOSy7-5QSzFzC9UyOIdP7~KfFh2EKciOmkTcvFTB4J0-GFJ50Fog7G4F9hzerjyMUggHZcc-6JevvVjVwfgTFIcu2RBeXzqiTxpEblKGL3hDSrcnxMliU4jg2eOQRl7twljvRPCBZghomBMv6Sa921vTDvPRTAzLLbrXryQZe4YNGbHUa8V2b0hRqodCDi~mymmZKjXFm-kArv7UzgkjAan-f1XEKcAIxV2POJh0N9kw__',
  'https://s3-alpha-sig.figma.com/img/8075/8699/07f88fa5c1c5e7e40c7fdbb6a99ee791?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gIAU~lSCYUSqv56TKRjYj1lHr4JQj88ChJnt29~4g-1QlwpOk3XMlx5ZniNjO2V1L7bs~yDKQNpOSxJyT~4d8lsa6an1xoHA1Nlt-VVrwzXhy7YyyWWeE0E~MY20HH6ReBcH2kwoVHPdhzGur7Y6wfv-tm2gZiY83SCPXz-hq-ULFOeDP-HAM08O6AAfVVl~7n4zGvGUkSMnLeNlQIqZ8l8gw3hwnUtomqh3Jkj7IQIF93zzBN1GfYZnra8ICbsos9ck9nWbh~qhvgAHX98b8QzFYLoDtgbcx43fllOdztKUVEVnTYvAj-trth9xih1KL2TCXjtkkeZNquxlfSNb1w__',
  'https://s3-alpha-sig.figma.com/img/d75f/a80c/83a58c1165dd9a3bc57ddcbaffa55250?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=qejr5eiFKLwzNFlNr8cMiPgatKrldQqvjV8Jzq-QX4uPcF-tSIakBlLgeRPab6SEHO4K-N42-KM4hLEj6KR4Xmt6F8jheLm47WiuCxa3haYymbjaqdduHQqDzjevwziIUA-p-jVjeMvcyGutsV1VaFGswqsU3zQ0-keTEp2ccv8S~y5nm7T8xeqAaIbEMQNMYkcblizqC8bnxY4rU1015C6-NLTYZ6IsKHJkSmoBDdernREpN1LVGNevMHmtNOSqU6gH4YukD6C1dw0SJr1jUO1ZjYuNTuxXRcl7-WRTdiUu14-0MBqp29gJbHgqqqXVQSSfhebn19~nCXMJGJe6~Q__',
  'https://s3-alpha-sig.figma.com/img/54ed/a733/2c62fb3496ceb409dd8c9262e2a924b9?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Bpx4sT8Q3jM8nsdezBTwSWlZ-Q5V1YJPSFqbxUXImtxz192uVfTxAoUuahfFJ7e479HGBm8oWtYYYnToQnS6mXzk0ye8E2xye0cHDeHSAbq5YvJszu21--1gump-P~i2ZGPebzgl1qm0mGPVdJn2VNJyguUodByY8Rsx6fdOx2Ju2h6bCab4InQcx4nJzlRr22H-ZuY97CwRL07U-wUJSzvrMdv~eYZkPBpcxDkIjH0e14Hsac7ltcl1nWJSwC73SjKScsi1nUJTZf93dralYMR9q5N2rEIRt1~vfzJiMC5hOWiBlUaxTKGDezo03DUmQxSJeea2EuTRF9dUPFfHPQ__',
  'https://s3-alpha-sig.figma.com/img/c63c/d467/0a1f0bb10c93cce8c930a819dd030a32?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=oX-iw-yzYfGoRDolKwcBmUIJKVXWVW-K3E8oZLURH97dYReiovN-AmlFWeiLNwYVhUTtuYdMCuFbMjdbwZP7Ty55xsZW2HlJqa-30rhKFAGjpTtHTzG4T2IXzMW6mYMWdGJulHKHZ5-E~JNnIaXJSEGy~NjwUYChIRGNuOLyI0ColiOsknvdydpBdPJiz9UuXlovt6-TeGX5JR5s81~TdhxeFWwRxFxIA48-CRka7gPUUb2Ojm5d~Dc8IjMyYadHbU7Y2aFMR3nP~QplTkmV71ibcOlDCR~t2bLhSkZmiXPIu7wQ8L2QCd-UNLK8OxhPvo1-s2m77Z58ZSwNP4BXlg__',
  'https://s3-alpha-sig.figma.com/img/6fd3/9a9e/eacf4628075215040888decab2660b35?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=MsWWcxWmjs2yUDQcp2yMYMO6uYlt9PKnoF6d6dHm4MDDmZO4qRtQH2DJWoX~fdSu~pItGwvmGKSVlurG7VT6gyV3JDRUqnEkqhk674NlBVhFGMvDtMbf3jOXjG2Tq8~AOOObyXGAkbUDinITaVXmZUxcUk6BUHM5f7EjnaagHmx97WTlAlIVONnJJFCQGaWOFxmhpwXJ01WOtecoFKF5UH25VOq2aIfpSHTzjrdAzKimb5~vzP9PHpyOP-eE~LFd3eCGAxl2X69fYfqFGd3r2eQlMk2402REJ4hk49p3ozuS4xp6MQK4VsRm8uQAicAIP1AW5ZYVPqdYVyrlTzC4Bw__',
  'https://s3-alpha-sig.figma.com/img/dd2a/e637/8a05a78759d31e6b549d119125b41d73?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=i8rguBHl5gDTaA6Ny4WKbm-H2MSi2V7wcYlf5mRytE7YKXycWqaE88x28AN4cIl7blS2h6AzeD0Ea7lEnYV~6dwAcLTY-mLUZplwQLbZ9s42U8IOmFM9zjTyCOHhfh5rOw8rGQ1b2dI37osypZHe6QvOqxl8zfkXnojNq9kj2vxc5VBPRpX1zzpQu6rXkCV~ouIdCh4ZmaaJbNnKWv0VKmslrwZG7eIwButmZyeshHNC7iNfmoivd1G~UdeM9mm6wH0kLeBWPjF5lZtDsG-IOAAF1MmUfwrw~oXrHOEbu~MhPM2rsv7G3fqlFZY1CAJdBAyaWNiQe7BNdJ4KYkbr9Q__',
  'https://s3-alpha-sig.figma.com/img/19d1/d4a2/adb13ece34c0984ebdcf0eb8034f3fc3?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=j9Pg5cXmf3A2eNICWmpxHcDTXisA5NBmc8esmv0P1zrNG0EpE-6oAIc4Ii0vJYgpKyc4-uDyKhscHLSogeUA2jv0duahB8HJWuisaJ5AyM611D0bA~vuVrvte8vwqFZI8-B9sJO-sp5mtQb~~mT2xgPANg5-e1cJY1k9D4DJV3BQoCF44zztwU3lX63WqmRBg8wunqqzToTyrgbdahwYeMJQUUwCLXps1k6INTv8Jie4al5ERdzZXHyCxMyFRmUqyoi0mvibXciQ6x0CbvByvKtacirIq1MsSbDqhlTUHZqe539p5Fu3WznxU8AyGZ3AM7Zs~ChLuPQH7Qu6kUv4xg__',
  'https://s3-alpha-sig.figma.com/img/1503/f3e3/186f791776985dacc9280db8f5453552?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=DThe1R1r9L2erA4u7-SykAFq1sOfP-k2UpZGLy6VRUQ8u8tV7iAr37z7yP8SCNRaOrI2W~LXAV7bBeyxUzCJsdL739AsAnLmaTAUzG7sNNtbz8sgz32B31rEYNuVZlXwBLW9QF1iYmQQ2Hal8bliklbMXn~iNQzKQm0Jijj5JuXkFMl3-K~BzMXkIEjL5t0iSnvQWRZOulrnIA7SaDt6onme~-YvMYg7vw4kvyizteYPITHOYjH1vkZQ535ojBaZMPwEHiz3Z~IK4MzReo2dSxo9zl8MYw7Mw3J76fp3n~FQ4jJ-xRBzQ056yNUdL7cAf26F7r4zhT-IdMjQMluprw__',

];

const SelectAvatar = () => {
  const [avatars, setAvatars] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json(); 
        if (Array.isArray(data)) {
          setAvatars(data);
        } else {
          console.error('Expected array, got:', data);
          setAvatars([]);
        }
      } catch (err) {
        console.error('Failed to load avatars:', err);
      }
    };
    if (userId) fetchAvatars();
  }, [userId]);

  const handleAddAvatar = async () => {
    if (avatars.length >= 5) return;

    const randomAvatar = avatarOptions[Math.floor(Math.random() * avatarOptions.length)];
    const body = {name: 'New User', avatar: randomAvatar, userId,};
    try {
      const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      setAvatars([...avatars, data]);
    } catch (err) {
      console.error('Failed to add a bew avatar:', err);
    }
  };

  const handleDeleteAvatar = async (id) => {
    try {
      await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAvatars(avatars.filter((avatar) => avatar._id !== id));
    } catch (err) {
      console.error('Failed to delete avatar:', err);
    }
  };

  const handleKeyDown = async (e, id) => {
    if (e.key === 'Enter') {
      const avatar = avatars.find((a) => a._id === id);
      const body = { name: avatar.name };

      try {
        const response = await fetch(`https://netflix-server-4a8a.onrender.com/api/avatars/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        await response.json();
        setEditingId(null);
      } catch (err) {
        console.error('Failed to update name:', err);
      }
    }
  };

  const handleNameChange = (e, id) => {
    setAvatars(
      avatars.map((avatar) =>
        avatar._id === id ? { ...avatar, name: e.target.value } : avatar
      )
    );
  };

  const handleAvatarClick = (avatar) => {
    sessionStorage.setItem('selectedAvatarName', avatar.name);
    sessionStorage.setItem('selectedAvatarPng', avatar.avatar);
    navigate('/home');
  };

  return (
    <div className="profile-container">
      <h2>Who's watching?</h2>
      <div className="profile-grid">
        {avatars.map((avatar) => (
          <div className="profile-card" key={avatar._id}>
            <div className="avatar-wrapper" >
              <img src={avatar.avatar} alt="avatar" className="avatar-img" onClick={() => handleAvatarClick(avatar)}/>
              <div className="delete-icon" onClick={() => handleDeleteAvatar(avatar._id)}>
                <FaTrash />
              </div>
            </div>
            {editingId === avatar._id ? (
              <input
                type="text"
                value={avatar.name}
                onChange={(e) => handleNameChange(e, avatar._id)}
                onKeyDown={(e) => handleKeyDown(e, avatar._id)}
                autoFocus
              />
            ) : (
              <p onClick={() => setEditingId(avatar._id)}>{avatar.name}</p>
            )}
          </div>
        ))}
        {avatars.length < 5 && (
          <div className="profile-card add-profile" onClick={handleAddAvatar}>
            <div className="add-profile-box">
              <div className="avatar-wrapper add">
                <span className="plus-icon">+</span>
              </div>
              <p>Add Avatar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectAvatar;
