import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
public text=''
  constructor(private http: HttpClient) { }

  async generateText(prompt: string) {
    
    console.log("start");
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    };
    // return this.http.post<any>(`${this.apiUrl}`, body, { headers: headers });
    // this.http.post<OpenAIResponse>('https://api.openai.com/v1/chat/completions', body, { headers }).subscribe((response: OpenAIResponse) => {
    //   console.log(response);
    //   console.log(response.choices[0].message.content);
    //   result=response.choices[0].message.content;
    //   this.text=response.choices[0].message.content;
    //   return result;
    // });

    const response = await this.http.post<OpenAIResponse>('https://api.openai.com/v1/chat/completions', body, { headers }).toPromise();
    return response!.choices[0].message.content;
  }
}
interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
}
