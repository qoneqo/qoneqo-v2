import {
  AiOutlineFacebook,
  AiOutlineTwitter,
  AiOutlineYoutube,
  AiOutlineGithub,
} from 'react-icons/ai';

const WebFooter = () => {
  return (
    <>
      <footer className="bg-zinc-800 text-white text-sm py-2 px-8 text-center flex items-center justify-between">
        <p className="flex">
          <AiOutlineFacebook className="text-xl mx-1" />
          <AiOutlineTwitter className="text-xl mx-1" />
          <AiOutlineYoutube className="text-xl mx-1" />
          <AiOutlineGithub className="text-xl mx-1" />
        </p>
        <p>Copyright &copy;2022 Qoneqo</p>
      </footer>
    </>
  )
}

export default WebFooter
