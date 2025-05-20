from pytube import YouTube
import os

def yt_download():
    # Solicita ao usuário o link do vídeo
    link = input("Digite o link do vídeo do YouTube: ").strip()

    # Cria a pasta downloads se não existir
    pasta_downloads = os.path.join(os.path.dirname(__file__), '..', '..', '..', 'downloads')
    pasta_downloads = os.path.abspath(pasta_downloads)
    os.makedirs(pasta_downloads, exist_ok=True)

    try:
        yt = YouTube(link)
    except Exception as e:
        print(f"Erro ao acessar o vídeo: {e}")
        return

    opcao = input("Você deseja baixar em MP3 ou MP4? ").strip().lower()

    if opcao == "mp3":
        # Baixa apenas o áudio
        stream = yt.streams.filter(only_audio=True).first()
        caminho_arquivo = stream.download(output_path=pasta_downloads)
        print("Download do áudio concluído!")

        # Converte para mp3 se não for mp3
        if not caminho_arquivo.endswith('.mp3'):
            try:
                from moviepy.editor import AudioFileClip
                mp3_path = os.path.splitext(caminho_arquivo)[0] + ".mp3"
                audio_clip = AudioFileClip(caminho_arquivo)
                audio_clip.write_audiofile(mp3_path)
                audio_clip.close()
                os.remove(caminho_arquivo)
                print("Arquivo convertido para MP3 com sucesso!")
            except ImportError:
                print("moviepy não instalado. O áudio foi salvo no formato original.")
            except Exception as e:
                print(f"Erro ao converter para MP3: {e}")

    elif opcao == "mp4":
        # Baixa o vídeo
        stream = yt.streams.get_highest_resolution()
        stream.download(output_path=pasta_downloads)
        print("Download do vídeo concluído!")

    else:
        print("Opção inválida. Escolha entre MP3 ou MP4.")