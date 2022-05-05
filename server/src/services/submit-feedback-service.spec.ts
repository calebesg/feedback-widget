import { SubmitFeedbackService } from './submit-feedback-service';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('should be able a submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'comentario de teste',
        screenshot: 'data:image/png;base64,skdjflsdf',
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able a submit a feedback without type', async () => {
    await expect(
      submitFeedback.execute({
        type: '',
        comment: 'comentario de teste',
        screenshot: 'data:image/png;base64,skdjflsdf',
      })
    ).rejects.toThrow();
  });

  it('should not be able a submit a feedback without comment', async () => {
    await expect(
      submitFeedback.execute({
        type: 'GUB',
        comment: '',
        screenshot: 'data:image/png;base64,skdjflsdf',
      })
    ).rejects.toThrow();
  });

  it('should not be able a submit a feedback with invalid screenshot', async () => {
    await expect(
      submitFeedback.execute({
        type: 'GUB',
        comment: 'comentario',
        screenshot: 'image.png',
      })
    ).rejects.toThrow();
  });
});
