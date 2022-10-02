package com.ssafy.setak.common.util;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Component
public class UserUtil {
    public String createName() throws IOException {
        StringBuilder result = new StringBuilder();
        String urlStr = "https://nickname.hwanmoo.kr/?format=text&count=1";
        URL url = new URL(urlStr);

        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");

        BufferedReader br;
        br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(),"UTF-8"));

        String returnLine;
        while((returnLine = br.readLine()) != null){
            result.append(returnLine + "\n\r");
        }
        urlConnection.disconnect();

        String name = result.toString().trim();
        String key = " " + (int) (Math.random()*100000);
        return name + key;
    }
}
