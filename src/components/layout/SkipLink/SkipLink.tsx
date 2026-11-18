import styles from './SkipLink.module.scss';

export const MAIN_CONTENT_ID = 'conteudo';

/** Primeiro item focável da página: pula o header direto para o <main>. */
export function SkipLink() {
  return (
    <a href={`#${MAIN_CONTENT_ID}`} className={styles.skipLink}>
      Pular para o conteúdo
    </a>
  );
}
