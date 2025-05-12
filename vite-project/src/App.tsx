import './App.css'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal} from 'react-bootstrap';

interface Profile {
  name: string;
  date: string;
  tell: string;
  img: string;
}

const App = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [tell, setTell] = useState('');
  const [img, setImg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [profile, setProfile] = useState<Profile | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImg(URL.createObjectURL(file));
    }
  }

  const handleSubmit = () => {

    const [year, month, day] = date.split('-');
    const dateMonth = `${month.padStart(2, '0')}月${day.padStart(2, '0')}日生まれ`

    setProfile({
      name,
      date: dateMonth,
      tell,
      img: img || ''
    });
    setShowModal(true);
  };



  return (
    <div className="container">
      <h1>プロフィール自動生成</h1>

      <div className='box'>
        <div className="formBox">
          <h2>名前</h2>
          <input type="text" placeholder='名前太郎' value={name} onChange={(e) => setName(e.target.value)} />
          <h2>お誕生日</h2>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <h2>電話番号</h2>
          <input type="tel" value={tell} onChange={(e) => setTell(e.target.value)} />
          <h2>プロフィール画像</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button onClick={handleSubmit}>プロフィール作成</button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <div className="cardBox">
            <div className="imgbox">
              <img src={profile?.img} alt="プロフィール画像" />
            </div>
            <h2>{profile?.name}</h2>
            <h2>{profile?.date}</h2>
            <h2>{profile?.tell}</h2>
          </div>
        </Modal>

      </div>
    </div>
  )
}

export default App
