import styles from './NewTabNotice.module.scss';

/**
 * Completa o nome acessível de links com `target='_blank'`. O espaço fica num nó de texto
 * próprio para o nome não sair colado ("WhatsApp(abre em nova aba)").
 */
export function NewTabNotice() {
  return (
    <>
      {' '}
      <span className={styles.notice}>(abre em nova aba)</span>
    </>
  );
}
